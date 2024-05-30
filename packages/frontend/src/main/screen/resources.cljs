(ns screen.resources
  (:require [reagent.core :as r]
            [component.helplines :refer [helplines]]
            ["react-native" :as rn]
            ["@expo/vector-icons" :refer [FontAwesome5]]))

(defn section-header [title]
  [:> rn/View
   [:> rn/Text {:style {:fontWeight :bold
                        :color "#2A4E4C"
                        :marginTop 10
                        :marginBottom 10
                        :fontSize 16}}
    title]]) ; modified from home.cljs

(defn telegram-card [title text img bg-color linkurl]
  [:> rn/Pressable {:style {:backgroundColor bg-color
                            :flex 1
                            :justifyContent :center
                            :flexDirection :row
                            :marginBottom 10}
                    :onPress #(rn/Linking.openURL linkurl)}
   [:> rn/View {:style {:margin 10 :flex 2}}
    [:> rn/Image  {:source img}]]
   [:> rn/View {:style {:flex 3
                        :flexDirection :column
                        :margin 10
                        :maxHeight 137}}
    [:> rn/Text {:style {:fontWeight :bold
                         :fontSize 16
                         :color "#2A4E4C"
                         :marginBottom 10
                        ;:textAlign :justify
                         }}
     title]
    [:> rn/Text ;{:style {:textAlign :justify}}
     text]
    [:> rn/View {:style {:flex 1
                         :flexDirection :row-reverse
                         :position :relative}}
     [:> FontAwesome5 {:name "telegram"
                       :size 32
                       :style {:position "absolute"
                               :bottom 0
                               :right 0}}]]]])

(defn resources-screen-inner []
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :alignItems :stretch
                        :marginTop "8vw"
                        :paddingLeft 20
                        :paddingRight 20}} ; also modified from home.cljs
    [:> rn/Text {:style {:fontSize 24
                         :fontWeight :bold
                         :color "#2A4E4C"
                         :marginBottom "5vw"}}
     "Stay updated with us" ]

    [section-header "Telegram"]

    [telegram-card
     "CSSCOM Well‑being"
     "Daily boost to your mental well‑being"
     (js/require "../assets/telegram_image_1.png")
     "#DEF7E5"
     "https://t.me/+qw2b_RfOEaY3MmQ1"]

    [telegram-card
     "Mindline.sg"
     "An external digital platform with self-care/ stress management tools, knowledge and pathways to professional help."
     (js/require "../assets/telegram_image_2.png")
     "#DDF1FE"
     "https://mindline.sg/"]
    
    [section-header "Useful Contacts"]
    [helplines true]]])

(defn resources-screen []
  [resources-screen-inner])
