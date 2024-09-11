(ns screen.mindfulpause
  (:require [re-frame.core :as rf]
            ["react-native" :as rn]
            ["react-native-webview" :as rnwv]))

(defn audio-option-button [{name :name icon :icon audio-file :audio-file}]
  [:> rn/Pressable {:style {:marginBottom 10
                            :maxWidth "50vw"}
                    :onPress #(rf/dispatch [:play-track {:audio-file audio-file}])}
   [:> rn/Text {:style {:fontSize 22
                        :color "#A5A5A5"
                        :fontWeight "bold"
                        :justifyContent "center"}}
    icon
    [:> rn/Text {:style {:margin 5}} ""]
    name]])

(defn handle-navigation [navigation destination]
  (.navigate navigation destination))

(defn mindfulpause-screen [{navigation :navigation}]
  [:> rnwv/WebView {:source {:uri "https://sbe-testbed.rizsite.com/assets2/mindful-minutes.html"}
                    :onMessage (fn [e] (handle-navigation navigation (.. e -nativeEvent -data)))}])
