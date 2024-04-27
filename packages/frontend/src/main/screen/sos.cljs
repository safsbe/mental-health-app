(ns screen.sos
  (:require [reagent.core :as r]
            ["react-native" :as rn]))

(defn prominent-dialer []
  [:> rn/View {:style {:alignItems :center}}
;                       :height :90%}}
   [:> rn/View {:style {:alignItems :center
                        :justifyContent :center
                        :padding :15px
;                        :height :90%
                        :maxWidth :500px}}
    [:> rn/Text {:style {:fontSize 24}} "You are not alone."]
    [:> rn/Text {:style {:fontSize 24}} "We're here to help."]
    [:> rn/Text {:style {:fontSize 14
                         :color :#a5a5a5}} "You will remain anonymous."]
    [:> rn/View {:style {:borderRadius :100%
                         :background :#FCEDD0
                         :margin :20px
                         :padding :15px
                         :width :90vw
                         :maxWidth :200px
                         :maxHeight :200px
                         :height :90vw}
                 :onPress #(rn/Linking.openURL "tel:1767")
                 :accessibilityRole :button
                 :focusable true}
     [:> rn/View {:style {:borderRadius :100%
                          :background :#F5D596
                          :padding :15px
                          :width :100%
                          :height :100%}}
      [:> rn/View {:style {:borderRadius :100%
                           :background :#E09400
                           :padding :10px
                           :height :100%
                           :width :100%
                           :justifyContent :center
                           :alignItems :center}}
       [:> rn/Text {:style {:color :#fff
                            :textAlign :center
                            :fontSize :30px
                            :fontWeight :bold}}
        "SOS"]
       [:> rn/Text {:style {:color :#fff
                            :textAlign :center
                            :fontSize 14}}
        "Samaritans of Singapore"]
       [:> rn/Text {:style {:color :#fff
                            :textAlign :center
                            :fontSize 14}}
        "Helpline 1767"]]]]
    [:> rn/Text {:style {:color :#a5a5a5
                         :fontSize 14}}
     "The button will bring up your phone’s dialler but will not call immediately."]]])

(defn helpline-group [title hotlines]
  [:> rn/View
   [:> rn/Text title]])

(defn helplines []
  [:> rn/View
   [:> rn/Text {:style {:color :#2A4E4C
                        :fontSize 24}}
    "More helplines"]
   [helpline-group
    "General Mental Well-Being"]])

(defn sos-screen []
  [:> rn/ScrollView
   [prominent-dialer]
   [helplines]])
