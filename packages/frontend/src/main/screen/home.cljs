(ns screen.home
  (:require [reagent.core :as r]
            [screen.sos :refer [sos-screen]]
            ["react-native" :as rn]
            ["@react-navigation/drawer" :as rnd]
            ["@expo/vector-icons" :refer [FontAwesome5]]))

(defn section [title child]
  [:> rn/View {:style {:margin :10px}}
   [:> rn/Text {:style {:fontWeight :bold
                        :color :#2A4E4C
                        :marginBottom :10px}}
    title]
   child])

(defn explore-card [title bg-color my-url]
  [:> rn/View {:style {:background bg-color
                       :borderRadius :6px
                       :marginRight :15px
                       :padding :15px
                       :width :180px
                       :height :200px}}
   [:> rn/Text {:style {:textAlign :right
                        :fontWeight :bold
                        :color :#2A4E4C}}
    title]
   [:> rn/Image {:source my-url}]])

(defn explore []
  [:> rn/ScrollView {:horizontal true}
   [explore-card "Self" :#fff7d6 :my-url]
   [explore-card "Self-Care" :#DDE5FF :my-url]
   [explore-card "About Mental Health" :#DEF7E5 :my-url]
   [explore-card "About Others" :#FFE7E7 :my-url]])

(defn mindful-pauses []
  [:> rn/View {:style {:background :#FFE7E7
                       :padding :15px
                       :borderRadius :6px
                       :flexDirection :row
                       :gap :5px}}
   [:> rn/Text {:style {:flex 2}}
    "Image goes here"]
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
    [:> FontAwesome5 {:name :frown
                      :size 32
                      :color :black}]
    [:> FontAwesome5 {:name :frown-open
                      :size 32
                      :color :black}]]])

(def Drawer (rnd/createDrawerNavigator))

(defn home-screen-inner []
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :align-items :stretch
                        :paddingLeft :5px
                        :paddingRight :5px}}
    [daily-feeling-scale]
    [section "Quote of the day"
     [quote-of-the-day]]
    [section "Mindful Pauses" 
     [mindful-pauses]]
    [section "Explore"
     [explore]]]])

(defn drawer-navigation []
  [:> Drawer.Navigator {:initialRouteName :Home}
   [:> Drawer.Screen {:name :Home
                      :component (r/reactify-component home-screen-inner)}]
   [:> Drawer.Screen {:name :SOS
                      :component (r/reactify-component sos-screen)}]])

(defn home-screen []
    [drawer-navigation]
)
