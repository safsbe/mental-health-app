(ns screen.auth
  (:require
   [reagent.core :as r]
   [re-frame.core :as rf]
   ["react-native" :as rn]))

(def styles (-> (.create rn/StyleSheet #js {:btn
                                            {:paddingTop 10
                                             :paddingBottom 10
                                             :paddingLeft 30
                                             :paddingRight 30
                                             :minWidth 20
                                             :borderRadius 8
                                             :border "2px solid #2A4E4C"
                                             :textAlign "center"}
                                            
                                            :btn-primary
                                            {:background "#2A4E4C"
                                             :color "#FFF"}
                                            
                                            :btn-secondary
                                            {:border "2px solid #2A4E4C"}
                                            
                                            :auth-screen
                                            {:position "relative"
                                             :height "100%"}
                                            
                                            :auth-logo-container
                                            {:justifyContent "center"
                                             :alignItems "center"}
                                            
                                            :auth-selection
                                            {:width "100%"
                                             :flexDirection "row"
                                             :alignItems "center"
                                             :justifyContent "center"
                                             :columnGap 20}})
                (js->clj {:keywordize-keys true})))

(defn auth-screen []
  [:> rn/View {:style (:auth-screen styles)}
   [:> rn/View {:style (:auth-logo-container styles)}
    [:> rn/Image {:source (js/require "../assets/logo.png")}]
    [:> rn/Text {:style {:textAlign "center"}}
     "For when you are feeling something..."]]
   
   [:> rn/View {:style (:auth-selection styles)}
    [:> rn/Text {:accessibilityRole "button"
                 :style (merge (:btn styles)
                               (:btn-primary styles))}
     "Login"]
    [:> rn/Text {:accessibilityRole "button"
                 :onPress #(rf/dispatch [:set-user-mode :guest])
                 :style (merge (:btn styles)
                               (:btn-secondary styles))}
     "Guest"]]])
