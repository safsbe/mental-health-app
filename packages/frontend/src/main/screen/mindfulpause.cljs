(ns screen.mindfulpause
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["@expo/vector-icons" :refer [Feather, SimpleLineIcons, MaterialIcons, FontAwesome6]]))

(defn audio-option-button [title logofamily logo audiofile] ; INPUT FOR AUDIOFILE, PLEASE SET UP ON YOUR END @RIFA
  [:> rn/Pressable {:style {:marginBottom "10px"
                            :marginLeft "30vw"
                            :maxWidth "50vw"}
                    :onPress #(js/console.log "Pressable")}
    [:> rn/Text {:style {:fontSize "22px"
                         :color "#A5A5A5"
                         :fontWeight "bold"
                         :justifyContent "center"}}
      [:> logofamily logo]
      [:> rn/Text {:style {:margin "5px"}}""]
      title]])

(defn mindfulpause-screen [{navigation :navigation}]
  [:> rn/View {:style {:flex 1
                       :background "#595F59"}}
    [:> rn/View {:style {:flex 2}}
      [:> rn/View {:style {:flex 1
                           :alignItems "center"
                           :height "100%"
                           :textAlign "center"
                           :justifyContent "center"}}
        [:> rn/Text {:style {:fontSize "14px"
                             :color "#A5A5A5"}}
          "Take a"]
        [:> rn/Text {:style {:fontSize "24px"
                             :fontWeight "bold"
                             :textAlign "center"
                             :alignItems "center"
                             :color "white"
                             :marginBottom "10px"}}
          "Mindful Pause"]
        [:> rn/Text {:style {:fontSize "14px"
                             :textAlign "center"
                             :color "#A5A5A5"}}
          "Life is a "
          [:> rn/Text {:style {:fontSize "14px"
                               :fontWeight "bold"}}
            "marathon"]]
        [:> rn/Text {:style {:fontSize "14px"
                             :textAlign "center"
                             :color "#A5A5A5"}}
          "Not a "
          [:> rn/Text {:style {:fontSize "14px"
                               :fontWeight "bold"}}
            "sprint"]]]]
    [:> rn/View {:style {:flex 5
                        :justifyContent "center"
                        :alignItems "center"}}
      [:> rn/Pressable {:style {:borderRadius "100%"
                                :border "10px solid #A5A5A5"
                                :width "50vw"
                                :height "50vw"
                                :maxWidth "280px"
                                :maxHeight "280px"
                                :justifyContent "center"
                                :alignItems "center"}
                        :onPress #(js/console.log "Test")}
        [:> Feather {:name :play
                     :size 128
                     :color "#A5A5A5"
                     :style {:paddingLeft "20px"}}]]
      [:> rn/Text {}]]
    [:> rn/View {:style {:flex 5}}
      [:> rn/View {:style {:flex 2}}
        [audio-option-button "Breathe" MaterialIcons {:name "air" :size "20px" :color "#A5A5A5"} :audiofile]
        [audio-option-button "Take a sip of tea" SimpleLineIcons {:name "cup" :size "20px" :color "#A5A5A5"} :audiofile] ; PLEASE CALL AUDIOFILE WHEN YOU SET IT UP @RIFA
        [audio-option-button "Take a walk" MaterialIcons {:name "directions-walk" :size "20px" :color "#A5A5A5"} :audiofile]
        [audio-option-button "Look at the sky" MaterialIcons {:name "cloud" :size "20px" :color "#A5A5A5"} :audiofile]
      ]
      [:> rn/Pressable {:style {:flex 1
                                :justifyContent "center"}
                        :onPress #(navigation.navigate "Explore" #js{:navigation navigation})}
        [:> rn/Text {:style {:fontSize "16px"
                             :color "#A5A5A5"
                             :textAlign "center"}}
          "Read More"]]]
  ])