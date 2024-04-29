(ns screen.home
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [screen.article :refer [article-screen]]
            [screen.explore :refer [explore-screen]]
            [screen.sos :refer [sos-screen]]
            ["react-native" :as rn]
            ["@react-navigation/drawer" :as rnd]
            ["@react-navigation/native-stack" :as rnns]
            ["@expo/vector-icons" :refer [FontAwesome5]]))

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

(defn mindful-pauses []
  [:> rn/View {:style {:background :#FFE7E7
                       :padding :15px
                       :borderRadius :6px
                       :flexDirection :row
                       :alignItems "space-around"
                       :gap :5px
                       :minHeight "20px"}}
   [:> rn/Image {:style {:flex 2
                         :height "100%"}
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
   [:> FontAwesome5 {:name :quote-right
                     :size 24
                     :color :white
                     :style {:paddingRight :12px}}]
   [:> rn/Text {:style {:color :white}}
    "Just because no one else can heal or do your inner work for you, doesn't mean you can, should, or need to do it alone."]])

(defn daily-feeling-scale []
  [:> rn/View {:style {:padding :15px}}
   [:> rn/Text "How are you feeling today?"]
   [:> rn/View {:style {:flex 1
                        :flexDirection :row
                        :justify-content :space-around
                        :padding :10px}}
    [:> FontAwesome5 {:name :smile-beam
                      :size 32
                      :color :black}]
    [:> FontAwesome5 {:name :smile
                      :size 32
                      :color :black}]
    [:> FontAwesome5 {:name :meh
                      :size 32
                      :color :black}]
    [:> FontAwesome5 {:name :frown
                      :size 32
                      :color :black}]
    [:> FontAwesome5 {:name :frown-open
                      :size 32
                      :color :black}]]])

(def Drawer (rnd/createDrawerNavigator))
(def Stack (rnns/createNativeStackNavigator))

(defn home-screen-inner [{navigation :navigation}]
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :align-items :stretch
                        :paddingLeft :5px
                        :paddingRight :5px}}
    [daily-feeling-scale]
    [section "Quote of the day"
     [quote-of-the-day]]
    [section "Activities" 
     [mindful-pauses]]
    [section "Explore"
     [explore navigation]]]])

(defn stack-navigation []
  [:> Stack.Navigator {:initialRouteName "Home"}
   [:> Stack.Screen {:name "Home"
                     :component (r/reactify-component home-screen-inner)
                     :options {:headerShown false}}]
   [:> Stack.Screen {:name "Explore"
                     :component (r/reactify-component explore-screen)}]
     [:> Stack.Screen {:name "Article"
                       :component (r/reactify-component article-screen)}]])

(defn drawer-navigation []
  (let [user-name @(rf/subscribe [:user])]
  [:> Drawer.Navigator {:initialRouteName :Home
                        :screenOptions {:title #(r/reactify-component [:> rn/Text "Hello, " user-name])}}
   [:> Drawer.Screen {:name "Home"
                      :component (r/reactify-component stack-navigation)
                      :options  {:headerTitle #(r/reactify-component [:> rn/Text "Hello " user-name])}}]
   (comment
     [:> Drawer.Screen {:name :Home
                        :component (r/reactify-component home-screen-inner)}])
   [:> Drawer.Screen {:name :SOS
                      :component (r/reactify-component sos-screen)}]]))

(defn home-screen []
    [stack-navigation]
)
