(ns screen.resources
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["@expo/vector-icons" :refer [FontAwesome5]]))

(defn section-header [title]
  [:> rn/View
   [:> rn/Text {:style {:fontWeight :bold
                        :color :#2A4E4C
                        :marginTop :10px
                        :marginBottom :10px
                        :fontSize :16px}}
    title]]) ; modified from home.cljs

(defn telegram-card [title text img bg-color linkurl]
  [:> rn/Pressable {:style {:background bg-color
                            :flex 1
                            :justifyContent :center
                            :flexDirection :row
                            :marginBottom :10px}
                    :onPress #(rn/Linking.openURL linkurl)}
   [:> rn/View {:style {:margin :10px :flex :40%}}
    [:> rn/Image  {:source img}]]
   [:> rn/View {:style {:flex :60%
                        :flexDirection :column
                        :margin :10px
                        :maxHeight :137px}}
    [:> rn/Text {:style {:fontWeight :bold
                         :fontSize :16px
                         :color :#2A4E4C
                         :marginBottom :10px
                        ;:textAlign :justify
                         }}
     title]
    [:> rn/Text ;{:style {:textAlign :justify}}
     text]
    [:> rn/View {:style {:flex 1
                         :flexDirection :row-reverse
                         :position :relative}}
     [:> FontAwesome5 {:name "telegram"
                       :size "32px"
                       :style {:position "absolute"
                               :bottom 0
                               :right 0}}]]]])

(defn resources-screen-inner []
  [:> rn/ScrollView
   [:> rn/View {:style {:flex 1
                        :align-items :stretch
                        :marginTop :8vw
                        :paddingLeft :20px
                        :paddingRight :20px}} ; also modified from home.cljs
    [:> rn/Text {:style {:fontSize :24px
                         :fontWeight :bold
                         :color :#2A4E4C
                         :marginBottom :5vw}}
     "Stay updated with us" ]

    [section-header "Telegram"]

    [telegram-card
     "CSSCOM Well‑being"
     "Daily boost to your mental well‑being"
     (js/require "../assets/telegram-image-1.png")
     :#DEF7E5
     "https://t.me/+qw2b_RfOEaY3MmQ1"]

    [telegram-card
     "Mindline.sg"
     "An external digital platform with self-care/ stress management tools, knowledge and pathways to professional help."
     (js/require "../assets/telegram-image-2.png")
     :#DDF1FE
     "https://mindline.sg/"]
    
    [section-header "Useful Contacts"]
    [useful-contacts]
    ]])

(defn resources-screen []
  [resources-screen-inner])
