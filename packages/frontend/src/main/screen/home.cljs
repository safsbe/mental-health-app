(ns screen.home
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [screen.article :refer [article-screen]]
            [screen.explore :refer [explore-screen]]
            [screen.mindfulpause :refer [mindfulpause-screen]]
            [screen.mparticle :refer [MindfulPauseArticle-Screen]]
            [screen.articlemindfulpauses :refer [article-mindfulpauses]]
            [screen.articleknowyourpersonality :refer [article-knowyourpersonality]]
            ["@expo/vector-icons" :as evi]
            ["@react-navigation/native-stack" :as rnns]
            ["react-native" :as rn]))

(defn section [title child]
  [:> rn/View {:style {:margin 10}}
   [:> rn/Text {:style {:fontWeight "bold"
                        :color "#2A4E4C"
                        :marginBottom 10}}
    title]
   child])

#(js/console.log (.-get (.-rn/Dimensions "window")))

(defn explore-card [{name :name
                     color :color
                     image :image
                     category :keyword
                     nav :nav}]
  [:> rn/Pressable {:style {:backgroundColor color
                            :borderRadius 6
                            :padding 10
                            :width "40%"
                            :height "auto"
                            :flexGrow 1
                            ;:alignItems "center"
                            }
                    :onPress #(nav.navigate "Explore" #js{:category category})}
   [:> rn/Text {:style {:textAlign "right"
                        :fontWeight "bold"
                        :color "#2A4E4C"}}
    name]
   [:> rn/Image {:style {:width 96
                         :height 96
                         :flexGrow 1}
                 :source image}]])

;(defn explore2 [nav]
;  (let [categories @(rf/subscribe [:categories])]
;    (->> categories
;         (map (fn [[k v]]
;                [explore-card (assoc (assoc v :keyword k) :nav nav)]))
;         (into [:> rn/ScrollView {:horizontal true :persistentScrollbar true :contentContainerStyle {:style {:flexGrow 1}}}])))) ; // Changed from ScrollView to View // Actually just gonna change this to completely different to accomodate non scrollview anymore

(defn explore [nav]
  (let [categories @(rf/subscribe [:categories])]
    (->> categories
          (map (fn [[k v]]
                  [explore-card (assoc (assoc v :keyword k) :nav nav)]))
          (into [:> rn/View {:style {:flexDirection "row"
                                     :flexWrap "wrap"
                                     :gap 10
                                     :justifyContent "space-evenly"}}]))))

(defn activities [navigation]
  [:> rn/Pressable {:style {:backgroundColor "#FFE7E7"
                            :padding 5
                            :borderRadius 3
                            :flexDirection "row"
                            :alignItems "center"
                            :gap 5
                            :height 144
                            }
                    :onPress #(navigation.navigate "MindfulPause")}
   [:> rn/Image {:style {:flex 4
                         :height 128
                         :width 64}
                 :source (js/require "../assets/new/Stressed_Out_Graphic.png")}]
   [:> rn/View {:style {:flex 6}}
    [:> rn/Text {:style {:color "#2A4E4C"
                         :fontWeight "bold"}}
     "Overwhelmed and unable to focus?"]
    [:> rn/Text {:style {:color "#2A4E4C"}}
     "Take this mindful pause for a 5 minute break"]]])

(defn quote-of-the-day []
  [:> rn/View {:style {:alignItems "center"
                       :flexDirection "row"
                       :backgroundColor "#2A4E4C"
                       :padding 15
                       :borderRadius 6}}
   [:> evi/FontAwesome5 {:name "quote-right"
                         :size 24
                         :color "white"
                         :style {:paddingRight 12}}]
   [:> rn/Text {:style {:color "white"}}
    "Just because no one else can heal or do your inner work for you, doesn't mean you can, should, or need to do it alone."]])

(defn greeting []
  (let [user-name @(rf/subscribe [:user])]
    [:> rn/Text {:style {:fontSize 24
                         :fontWeight "bold"
                         :paddingLeft 15
                         :paddingRight 15
                         :color "#2A4E4C"}}
     "Hey, " (if (= nil user-name) "Guest", user-name) "!"]))

(defn daily-feeling-scale []
  (let [feeling-rating @(rf/subscribe [:user-feeling-scale/rating])
        feeling-ratings [(js/require "../assets/new/feelings_scale/Sad_Button.png") (js/require "../assets/new/feelings_scale/Slightly_Sad_Button.png") (js/require "../assets/new/feelings_scale/Neutral_Button.png") (js/require "../assets/new/feelings_scale/Slightly_Happy_Button.png") (js/require "../assets/new/feelings_scale/Happy_Button.png")]]
    [:> rn/View {:style {:padding 15}}
     [:> rn/Text "How are you feeling today?"]
     (->> feeling-ratings
         (map-indexed (fn [index, image-source]
                        [:> rn/Pressable {:onPress #(rf/dispatch [:user-feeling-scale/set-rating index])
                                          :style {:borderRadius 8
                                                  :padding 10
                                                  :backgroundColor (when (= index feeling-rating) "#B7DBD9")}}
                         [:> rn/Image {:source image-source
                                       :style {:height 48
                                               :width 48}}]]))
         
         ;(reverse) // Testing if this breaks
         (into [:> rn/View {:style {:flex 1
                                    :flexDirection "row"
                                    :justifyContent "space-around"
                                    :padding 10}}]))]))

(defn home-screen-inner [{navigation :navigation}]
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :alignItems "stretch"
                        :paddingTop 50
                        :paddingLeft 5
                        :paddingRight 5}}
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
                 :options {:headerShown false}}]
     [:> screen {:name "MindfulPauseArticle"
                 :component (r/reactify-component MindfulPauseArticle-Screen)}]
      
     ; Articles, add more article screens below ->
     [:> screen {:name "Article-MindfulPauses"
                 :component (r/reactify-component article-mindfulpauses)
                 :options {:title "Mindful Pauses"}}]
     [:> screen {:name "Article-KnowYourPersonality"
                 :component (r/reactify-component article-knowyourpersonality)
                 :options {:title "Know Your Personality (Legacy)"}}]           
                 ]))

(defn home-screen []
  [stack-navigation])

