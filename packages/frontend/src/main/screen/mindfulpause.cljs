(ns screen.mindfulpause
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            ["react-native" :as rn]
            ["@expo/vector-icons" :as evi]
            ["expo-av" :as eav]))

(defn audio-option-button [{name :name icon :icon audio-file :audio-file}] ; INPUT FOR AUDIOFILE, PLEASE SET UP ON YOUR END @RIFA
  [:> rn/Pressable {:style {:marginBottom 10
                            :maxWidth "50vw"}
                    :onPress #(rf/dispatch [:play-track {:audio-file audio-file}])}
   [:> rn/Text {:style {:fontSize 22
                        :color "#A5A5A5"
                        :fontWeight "bold"
                        :justifyContent "center"}}
    icon
    [:> rn/Text {:style {:margin 5}}""]
    name]])

(defn audio-player-system []
  (let [current-audio @(rf/subscribe [:play-track])
        play @(rf/subscribe [:start-play-track])
        audio-player (eav/Audio.Sound.)]
    (if (= nil current-audio)
      (.unloadAsync audio-player)
      (.loadAsync audio-player current-audio)) 
    (if (= play true)
      (.playAsync audio-player)
      (.pauseAsync audio-player))
    [:> rn/Text ""]))

(defn mindfulpause-screen [{navigation :navigation}]
  (let [audio-list @(rf/subscribe [:mindful-pause-audio])]
    [:> rn/View {:style {:flex 1
                         :backgroundColor "#595F59"}}
     [:> rn/View {:style {:flex 2}}
      [:> rn/View {:style {:flex 1
                           :alignItems "center"
                           :height "100%"
                           :textAlign "center"
                           :justifyContent "center"}}
       [:> rn/Text {:style {:fontSize 14
                            :color "#A5A5A5"}}
        "Take a"]
       [:> rn/Text {:style {:fontSize 24
                            :fontWeight "bold"
                            :textAlign "center"
                            :alignItems "center"
                            :color "white"
                            :marginBottom 10}}
        "Mindful Pause"]
       [:> rn/Text {:style {:fontSize 14
                            :textAlign "center"
                            :color "#A5A5A5"}}
        "Life is a "
        [:> rn/Text {:style {:fontSize 14
                             :fontWeight "bold"}}
         "marathon"]]
       [:> rn/Text {:style {:fontSize 14
                            :textAlign "center"
                            :color "#A5A5A5"}}
        "Not a "
        [:> rn/Text {:style {:fontSize 14
                             :fontWeight "bold"}}
         "sprint"]]]]
     [:> rn/View {:style {:flex 5
                          :justifyContent "center"
                          :alignItems "center"}}
      [:> rn/Pressable {:style {:borderRadius 5000
                                :borderStyle "solid"
                                :borderWidth 10
                                :borderColor "#A5A5A5"
                                :width "50vw"
                                :height "50vw"
                                :maxWidth 280
                                :maxHeight 280
                                :justifyContent "center"
                                :alignItems "center"}
                        :onPress #(rf/dispatch [:set-playing-mode true])}
       [:> evi/Feather {:name :play
                        :size 128
                        :color "#A5A5A5"
                        :style {:paddingLeft 20}}]]
      [:> rn/Text {}]]
     
     [:> rn/View {:style {:flex 5}}
      (->> audio-list
           (map (fn [{name :name audio-file :audio-file icon :icon}]
                  [audio-option-button {:name name :icon icon :audio-file audio-file}]))
           (into [:> rn/View {:style {:flex 2
                                      :alignItems "center"}}]))
      
      [:> rn/Pressable {:style {:flex 1
                                :justifyContent "center"}
                        :onPress #(navigation.navigate "Explore")}
       [audio-player-system]
       [:> rn/Text {:style {:fontSize 16
                            :color "#A5A5A5"
                            :textAlign "center"}}
        "Read More"]]]]))
