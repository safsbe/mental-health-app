(ns component.helplines
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["@expo/vector-icons" :refer [FontAwesome5]]))

(defn helpline-group [title helplines streamlined-svc-mode]
  [:> rn/View {:style {:marginTop (if streamlined-svc-mode "" "20px")}}
   [:> rn/Text {:style {:color "#2A4E4C"
                        :fontSize "16px"}}
    title]
   (->> helplines
        (map (fn [{name :name
                   contact :contact
                   operating-hours :operating-hours}]
               [:> rn/Pressable {:style {:flexDirection :row
                                         :alignItems "center"
                                         :justifyContent "space-between"
                                         :padding "10px"}
                                 :onPress #(rn/Linking.openURL (str "tel:" contact))}
                [:> rn/View
                 [:> rn/Text name]
                 [:> rn/Text {:style {:color :#a5a5a5}}
                  contact " · " operating-hours]]
                [:> FontAwesome5 {:name :phone
                                  :size 24
                                  :color :black}]]))
        (into [:> rn/View]))])

(defn helplines [streamlined-svc-mode]
  [:> rn/View {:style {:marginTop (if streamlined-svc-mode "" "20px")}}
   (when (not streamlined-svc-mode)
     [:> rn/Text {:style {:color :#2A4E4C
                          :fontSize 24}}
      "More helplines"]
     [helpline-group
      "General Mental Well-Being"
      [{:name "Institute of Mental Health"
        :contact "6389 2222"
        :operating-hours "24Hrs"}
       {:name "Samaritans of Singapore"
        :contact "1767"
        :operating-hours "24Hrs"}
       {:name "National Care Helpline"
        :contact "1800 202 6868"
        :operating-hours "Daily 8am-12am"}
       {:name "Silver Ribbon Singapore"
        :contact "6385 3714"
        :operating-hours "Weekdays 9am-5pm"}]])

   [helpline-group
    (if streamlined-svc-mode "" "Service Helplines")
    [{:name "Singapore Armed Forces"
      :contact "1800 278 0022"
      :operating-hours "24Hrs"}
     {:name "Singapore Civil Defence Force"
      :contact "1800 286 6666"
      :operating-hours "24Hrs"}
     {:name "Singapore Police Forces"
      :contact "1800 255 1151"
      :operating-hours "Weekdays 8.30am-6.30pm"}]
    streamlined-svc-mode]])
