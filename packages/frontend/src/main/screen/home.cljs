(ns screen.home
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [screen.article :refer [article-screen]]
            [screen.explore :refer [explore-screen]]
            [screen.mindfulpause :refer [mindfulpause-screen]]
            ["@expo/vector-icons" :as evi]
            ["@react-navigation/native-stack" :as rnns]
            ["react-native" :as rn]))

(defn section [title child]
  [:> rn/View {:style {:margin :10px}}
   [:> rn/Text {:style {:fontWeight :bold
                        :color :#2A4E4C
                        :marginBottom :10px}}
    title]
   child])

(defn explore-card [{name :name
                     color :color
                     image :image
                     category :keyword
                     nav :nav}]
  [:> rn/Pressable {:style {:backgroundColor color
                            :borderRadius 6
                            :marginRight 15
                            :padding 15
                            :width 160
                            :height 160
                            :alignItems :center}
                    :onPress #(nav.navigate "Explore" #js{:category category})}
   [:> rn/Text {:style {:textAlign "right"
                        :fontWeight "bold"
                        :color "#2A4E4C"}}
    name]
   [:> rn/Image {:style {:width 128
                         :height 128
                         :flexGrow 1}
                 :source image}]])

(defn explore [nav]
  (let [categories @(rf/subscribe [:categories])]
    (->> categories
         (map (fn [[k v]]
                [explore-card (assoc (assoc v :keyword k) :nav nav)]))
         (into [:> rn/ScrollView {:horizontal true}]))))

(defn activities [navigation]
  [:> rn/Pressable {:style {:background "#FFE7E7"
                            :padding "15px"
                            :borderRadius 6
                            :flexDirection "row"
                            :alignItems "center"
                            :gap 5
                            :minHeight "20px"}
                    :onPress #(navigation.navigate "MindfulPause")}
   [:> rn/Image {:style {:flex 2
                         :resizeMode "contain"
                         :height "100%"
                         :maxHeight "50px"}
                 :source (js/require "../assets/home_mindful_minutes.svg")}]
   [:> rn/View {:style {:flex 5}}
    [:> rn/Text {:style {:color "#2A4E4C"
                         :fontWeight "bold"}}
     "Overwhelmed and unable to focus?"]
    [:> rn/Text {:style {:color "#2A4E4C"}}
     "Take this mindful pause for a 5 minute break"]]])

(defn quote-of-the-day []
  [:> rn/View {:style {:alignItems "center"
                       :flexDirection "row"
                       :background "#2A4E4C"
                       :padding "15px"
                       :borderRadius 6}}
   [:> evi/FontAwesome5 {:name "quote-right"
                         :size 24
                         :color "white"
                         :style {:paddingRight "12px"}}]
   [:> rn/Text {:style {:color :white}}
    "Just because no one else can heal or do your inner work for you, doesn't mean you can, should, or need to do it alone."]])

(defn greeting []
  (let [user-name @(rf/subscribe [:user])]
    [:> rn/Text {:style {:fontSize 24
                         :fontWeight "bold"
                         :paddingLeft "15px"
                         :paddingRight "15px"
                         :color "#2A4E4C"}}
     "Hey, " (if (= nil user-name) "Guest", user-name) "!"]))

(defn daily-feeling-scale []
  (let [feeling-rating @(rf/subscribe [:user-feeling-scale/rating])
        feeling-ratings ["frown-open" "frown" "meh" "smile" "smile-beam"]]
    [:> rn/View {:style {:padding :15px}}
     [:> rn/Text "How are you feeling today?"]
     (->> feeling-ratings
         (map-indexed (fn [index, icon-name]
                        [:> rn/Pressable {:onPress #(rf/dispatch [:user-feeling-scale/set-rating index])
                                          :style {:borderRadius 8
                                                  :padding "10px"
                                                  :background (when (= index feeling-rating) "#B7DBD9")}}
                         [:> evi/FontAwesome5 {:name icon-name
                                               :size 32
                                               :color "#000"}]]))
         
         (reverse)
         (into [:> rn/View {:style {:flex 1
                                    :flexDirection "row"
                                    :justify-content "space-around"
                                    :padding "10px"}}]))]))

(defn home-screen-inner [{navigation :navigation}]
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :align-items :stretch
                        :paddingTop "50px"
                        :paddingLeft "5px"
                        :paddingRight "5px"}}
    [greeting]
    [daily-feeling-scale]
    [section "Quote of the day"
     [quote-of-the-day]]
    [section "Activities" 
     [activities navigation]]
    [section "Explore"
     [explore navigation]]]])

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
                 :component (r/reactify-component mindfulpause-screen)
                 :options {:headerShown false}}]]))

(defn home-screen []
  [stack-navigation])

