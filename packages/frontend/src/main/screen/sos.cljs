(ns screen.sos
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [component.helplines :refer [helplines]]
            ["react-native" :as rn]
            ["@expo/vector-icons" :refer [FontAwesome5]]))

(defn prominent-dialer []
  [:> rn/View {:style {:alignItems :center}}
   [:> rn/View {:style {:alignItems :center
                        :justifyContent :center
                        :padding :15px
                        :maxWidth :500px}}
    [:> rn/Text {:style {:fontSize 24}} "You are not alone."]
    [:> rn/Text {:style {:fontSize 24}} "We're here to help."]
    [:> rn/Text {:style {:fontSize 14
                         :color :#a5a5a5}} "You will remain anonymous."]
    [:> rn/Pressable {:style {:borderRadius :100%
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
     "The button will bring up your phone’s dialer but will not call immediately."]]])

(defn sos-screen []
  [:> rn/ScrollView {:style {:padding "10px"}}
   [prominent-dialer]
   [helplines]])
