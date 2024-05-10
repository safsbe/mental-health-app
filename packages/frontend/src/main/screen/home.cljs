(ns screen.home
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [screen.article :refer [article-screen]]
            [screen.explore :refer [explore-screen]]
            [screen.sos :refer [sos-screen]]
            [screen.mindfulpause :refer [mindfulpause-screen]]
            ["react-native" :as rn]
            ["@react-navigation/native" :as rnn]
            ["@react-navigation/drawer" :as rnd]
            ["@react-navigation/native-stack" :as rnns]
            ["@expo/vector-icons" :refer [FontAwesome5] :as evi]))

(defn section [title child]
  [:> rn/View {:style {:margin :10px}}
   [:> rn/Text {:style {:fontWeight :bold
                        :color :#2A4E4C
                        :marginBottom :10px}}
    title]
   child])

(defn explore-card [title nav category bg-color my-url]
  [:> rn/Pressable {:style {:background bg-color
                            :borderRadius :6px
                            :marginRight :15px
                            :padding :15px
                            :width :180px
                            :height :200px
                            :alignItems "fit"}
                    :onPress #(nav.navigate "Explore" #js{:category category})}
   [:> rn/Text {:style {:textAlign :right
                        :fontWeight :bold
                        :color :#2A4E4C}}
    title]
   [:> rn/Image {:style {:width "100%"
                         :height "100%"
                         :flexGrow 1}
                 :source my-url}]])

(defn explore [nav]
  [:> rn/ScrollView {:horizontal true}
   [explore-card "Self" nav :self :#fff7d6 (js/require "../assets/home-explore-self.svg")]
   [explore-card "Self-Care" nav :self-care :#DDE5FF (js/require "../assets/home-explore-self-care.svg")]
   [explore-card "About Mental Health" nav :mental-health :#DEF7E5 (js/require "../assets/home-explore-mental-health.svg")]
   [explore-card "About Others" :others nav :#FFE7E7 (js/require "../assets/home-explore-others.svg")]])

(defn mindful-pauses [navigation]
  [:> rn/Pressable {:style {:background :#FFE7E7
                            :padding :15px
                            :borderRadius :6px
                            :flexDirection :row
                            :alignItems "center"
                            :gap :5px
                            :minHeight "20px"
                            :onPress #(navigation.navigate "MindfulPause" #js{})}}
   [:> rn/Image {:style {:flex 2
                         :resizeMode "contain"
                         :height "100%"
                         :maxHeight "50px"}
                 :source (js/require "../assets/home-mindful-minutes.svg")}]
   [:> rn/View {:style {:flex 5}}
    [:> rn/Text {:style {:color :#2A4E4C
                         :fontWeight :bold}}
     "Overwhelmed and unable to focus?"]
    [:> rn/Text {:style {:color :#2A4E4C}}
     "Take this mindful pause for a 5 minute break"]]])

(defn quote-of-the-day []
  [:> rn/View {:style {:alignItems :center
                       :flexDirection :row
                       :background :#2A4E4C
                       :padding :15px
                       :borderRadius :6px}}
   [:> evi/FontAwesome5 {:name :quote-right
                         :size 24
                         :color :white
                         :style {:paddingRight :12px}}]
   [:> rn/Text {:style {:color :white}}
    "Just because no one else can heal or do your inner work for you, doesn't mean you can, should, or need to do it alone."]])

(defn greeting []
  (let [user-name @(rf/subscribe [:user])]
    [:> rn/Text {:style {:fontSize "24px"
                         :fontWeight "bold"
                         :paddingLeft "15px"
                         :paddingRight "15px"
                         :color "#2A4E4C"}}
     "Hey, " (if (= nil user-name) "Guest", user-name) "!"]))

(defn daily-feeling-scale []
  (let [feeling-rating @(rf/subscribe [:user-feeling-rating])
        feeling-ratings ["frown-open" "frown" "meh" "smile" "smile-beam"]]
    [:> rn/View {:style {:padding :15px}}
     [:> rn/Text "How are you feeling today?"]
     (->> feeling-ratings
         (map-indexed (fn [index, icon-name]
                        [:> rn/Pressable {:onPress #(rf/dispatch [:set-user-feeling-rating index])
                                          :style {:borderRadius "8px"
                                                  :padding "10px"
                                                  :background (when (= index feeling-rating) "#B7DBD9")}}
                         (if (= index feeling-rating)
                           [:> evi/FontAwesome5 {:name icon-name
                                                 :size 32}]
                           [:> evi/FontAwesome5 {:name icon-name
                                                 :size 32
                                                 :color "#000"}])]))
         
         (reverse)
         (into [:> rn/View {:style {:flex 1
                                    :flexDirection "row"
                                    :justify-content "space-around"
                                    :padding "10px"}}]))]))

(defn home-screen-inner [{navigation :navigation}]
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :align-items :stretch
                        :paddingTop :50px
                        :paddingLeft :5px
                        :paddingRight :5px}}
    [greeting]
    [daily-feeling-scale]
    [section "Quote of the day"
     [quote-of-the-day]]
    [section "Activities" 
     [mindful-pauses navigation]]
    [section "Explore"
     [explore navigation]]
    (comment
      [section "Test"
       [:> rn/Text (js/require "../assets/test.txt")]])]])

(defn stack-navigation []
  (let [stack (rnns/createNativeStackNavigator)
        navigator (.-Navigator stack)
        screen (.-Screen stack)]
    [:> navigator {:initialRouteName "Home"}
     [:> screen {:name "Home"
                 :component (r/reactify-component home-screen-inner)
                 :options {:headerShown false}}]
     [:> screen {:name "Explore"
                 :component (r/reactify-component explore-screen)}]
     [:> screen {:name "Article"
                 :component (r/reactify-component article-screen)}]
     [:> screen {:name "MindfulPause"
                 :options {:headerTitle ""
                           :headerStyle {:backgroundColor "#595F59"
                                         :borderBottomWidth 0}
                           :headerBackImageSource #(r/as-element
                                                    [:> FontAwesome5 {:name "angle-left"
                                                                      :size 24
                                                                      :color "white"}])}
                 :component (r/reactify-component mindfulpause-screen)}]]))

(defn drawer-navigation []
  (let [drawer (rnd/createBottomDrawerNavigator)
        navigator (.-navigator drawer)
        screen (.-screen drawer)
        user-name @(rf/subscribe [:user])]
    [:> navigator {:initialRouteName :Home
                   :screenOptions {:title #(r/reactify-component [:> rn/Text "Hello, " user-name])}}
     [:> screen {:name "Home"
                 :component (r/reactify-component stack-navigation)
                 :options  {:headerTitle #(r/reactify-component [:> rn/Text "Hello " user-name])}}]
     [:> screen {:name "SOS"
                 :component (r/reactify-component sos-screen)}]]))

(defn home-screen []
  [stack-navigation])

