(ns screen.articlemindfulpauses
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["react" :as react :refer [useRef]]
            ["react-native-markdown-display" :default Markdown]
            ["react-native-pager-view" :default PagerView :as pv]))

(defn article-mindfulpauses [{navigation :navigation 
                              route :route}]
  (let [myAtom (useRef nil)]
    (r/as-element
    [:> rn/View {:style {:flex 1}}
      [:> rn/View {:style {:flex 2
                          :padding 10
                          :gap 10}}
        [:> rn/View {:style {:flexDirection "row" 
                            :justifyContent "center"
                            :alignItems "center"
                            :flex 1
                            :gap 15}}
          [:> rn/Pressable {:style {:borderRadius 25
                                    :padding 10
                                    :backgroundColor "white"
                                    :borderColor "A5A5A5"
                                    :borderWidth 1}
                            ;:onPress #(.setPage .current myRef 2)
                            }
            [:> rn/Text {:style {:color "A5A5A5"
                                :fontSize 16}}
              "TL:DR"]]
          [:> rn/Pressable {:style {:borderRadius 25
                                    :padding 10
                                    :backgroundColor "white"
                                    :borderColor "A5A5A5"
                                    :borderWidth 1}
                            :onPress #(js/console.log "What is it")}
            [:> rn/Text {:style {:color "A5A5A5"
                                :fontSize 16}}
              "What is it"]]    
          [:> rn/Pressable {:style {:borderRadius 25
                                    :padding 10
                                    :backgroundColor "white"
                                    :borderColor "A5A5A5"
                                    :borderWidth 1}
                            :onPress #(js/console.log "Symptoms")}
            [:> rn/Text {:style {:color "A5A5A5"
                                :fontSize 16}}
              "Symptoms"]]
          ]
        [:> rn/View {:style {:flexDirection "row" 
                            :justifyContent "center"
                            :alignItems "center"
                            :flex 1
                            :gap 15}}
          [:> rn/Pressable {:style {:borderRadius 25
                                    :padding 10
                                    :backgroundColor "white"
                                    :borderColor "A5A5A5"
                                    :borderWidth 1}
                            :onPress #(js/console.log "Impact on NS")}
            [:> rn/Text {:style {:color "A5A5A5"
                                :fontSize 16}}
              "Impact on NS"]]
          [:> rn/Pressable {:style {:borderRadius 25
                                    :padding 10
                                    :backgroundColor "white"
                                    :borderColor "A5A5A5"
                                    :borderWidth 1}
                            :onPress #(js/console.log "Treatment")}
            [:> rn/Text {:style {:color "A5A5A5"
                                :fontSize 16}}
              "Treatment"]]                   
          ]
        ]
      [:f> PagerView {:initialPage 0 ;somehow idk how this works
                    :scrollEnabled true
                    :ref myAtom
                    :flex 14}
        [:> rn/View {:collapsable false
                    :key 1}
          [:> rn/Text "testA"]
          [:> rn/Pressable {:style {:backgroundColor "green"}
                            :onPress #(js/console.log "Test")}
            [:> rn/Text "testText"]]]
        [:> rn/View {:collapsable false
                    :key 2}
          [:> rn/Text "testB"]]
          ]
    
    ;; [:> rn/View {:style {:flex 1 ; Component for changing pages
    ;;                      :flexDirection "row"}}
    ;;   [:> rn/Pressable {:style {:backgroundColor "red"
    ;;                             :flex 1}}]
    ;;   [:> rn/Pressable {:style {:backgroundColor "blue"
    ;;                             :flex 1}}]
    ;;   [:> rn/Pressable {:style {:backgroundColor "yellow"
    ;;                             :flex 1}}]]
  ])))
