(ns screen.home
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [screen.article :refer [article-screen]]
            [screen.explore :refer [explore-screen]]
            [screen.sos :refer [sos-screen]]
            ["react-native" :as rn]
            ["@react-navigation/native" :as rnn]
            ["@react-navigation/drawer" :as rnd]
            ["@react-navigation/native-stack" :as rnns]
            ["@expo/vector-icons" :refer [FontAwesome5]]
            ["expo-file-system" :as efs]
            ["expo-asset" :refer [useAssets]]
            ["expo-image" :refer [Image] :as ei]))

(defn section [title child]
  [:> rn/View {:style {:margin 10}}
   [:> rn/Text {:style {:fontWeight :bold
                        :color "#2A4E4C"
                        :marginBottom 10}}
    title]
   child])

(defn explore-card [title nav category bg-color my-url]
  [:> rn/Pressable {:style {:backgroundColor bg-color
                            :borderRadius 6
                            :marginRight 15
                            :padding 15
                            :width 180
                            :height 200
                            :alignItems :center}
                    :onPress #(nav.navigate "Explore" #js{:category category})}
   [:> rn/Text {:style {:textAlign :right
                        :fontWeight :bold
                        :color "#2A4E4C"}}
    title]
   [:> rn/Image {:style {:width "100%"
                         :height "100%"
                         :flexGrow 1}
                 :source my-url}]])

(defn explore [nav]
  [:> rn/ScrollView {:horizontal true}
   [explore-card "Self" nav :self "#fff7d6" (js/require "../assets/home_explore_self.png")]
   [explore-card "Self-Care" nav :self-care "#DDE5FF" (js/require "../assets/home_explore_self_care.png")]
   [explore-card "About Mental Health" nav :mental-health "#DEF7E5" (js/require "../assets/home_explore_mental_health.png")]
   [explore-card "About Others" nav :others "#FFE7E7" (js/require "../assets/home_explore_others.png")]])

(defn mindful-pauses []
  [:> rn/View {:style {:backgroundColor "#FFE7E7"
                       :padding 15
                       :borderRadius 6
                       :flexDirection :row
                       :alignItems :center
                       :gap 5
                       :height "10vh"}}
   [:> rn/Image {:style {:flex 3
                         :height "100%"
                         :minHeight "20vh"}
                 :resizeMode "contain"
                 :source (js/require "../assets/home_mindful_minutes.png")
                 }]
   [:> rn/View {:style {:flex 5}}
    [:> rn/Text {:style {:color "#2A4E4C"
                         :fontWeight :bold}}
     "Overwhelmed and unable to focus?"]
    [:> rn/Text {:style {:color "#2A4E4C"}}
     "Take this mindful pause for a 5 minute break"]]])

(defn quote-of-the-day []
  [:> rn/View {:style {:alignItems :center
                       :flexDirection :row
                       :backgroundColor "#2A4E4C"
                       :padding 15
                       :borderRadius 6}}
   [:> FontAwesome5 {:name :quote-right
                     :size 24
                     :color :white
                     :style {:paddingRight 12}}]
   [:> rn/Text {:style {:color :white}}
    "Just because no one else can heal or do your inner work for you, doesn't mean you can, should, or need to do it alone."]])

(defn daily-feeling-scale []
  [:> rn/View {:style {:padding 15}}
   [:> rn/Text "How are you feeling today?"]
   [:> rn/View {:style {:flex 1
                        :flexDirection :row
                        :justifyContent :space-around
                        :padding 10}}
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

(defn greeting []
  (let [user-name @(rf/subscribe [:user])]
    [:> rn/Text {:style {:fontSize 24
                         :fontWeight "bold"
                         :paddingLeft 15
                         :paddingRight 15
                         :color "#2A4E4C"}} "Hey, " user-name, "!"]))

(def Drawer (rnd/createDrawerNavigator))
(def Stack (rnns/createNativeStackNavigator))

(defn HomeScreenInner [{navigation :navigation}]
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :alignItems :stretch
                        :paddingTop 50
                        :paddingLeft 5
                        :paddingRight 5}}
    [greeting]
    [daily-feeling-scale]
    [section "Featured Content"
     [quote-of-the-day]]
    [section "Activities" 
     [mindful-pauses]]
    [section "Explore"
     [explore navigation]]]])

(defn stack-navigation []
  [:> Stack.Navigator {:initialRouteName "Home"}
   [:> Stack.Screen {:name "HomeInner"
                     :component (r/reactify-component HomeScreenInner)
                     :options {:headerShown false}}]
   [:> Stack.Screen {:name "Explore"
                     :component (r/reactify-component explore-screen)}]
   [:> Stack.Screen {:name "Article"
                     :component (r/reactify-component article-screen)}]])

(defn drawer-navigation []
  [:> Drawer.Navigator {:initialRouteName "DrawerHome"}
   [:> Drawer.Screen {:name "DrawerHomeInner"
                      :component (r/reactify-component stack-navigation)
                      :listeners (fn [props]
                                   (let [{navigation :navigation} (js->clj props {:keywordize-keys true})]
                                     {:tabPress #(navigation.dispatch (rnn/StackActions.popToTop))}))}]
   [:> Drawer.Screen {:name "SOS"
                      :component (r/reactify-component sos-screen)}]])

(defn home-screen []
  [stack-navigation]
)
