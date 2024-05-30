(ns frontend.app
  (:require [re-frame.core :as rf]
            [reagent.core :as r]
            [shadow.expo :as expo]
            [screen.home :refer [home-screen]]
            [screen.sos :refer [sos-screen]]
            [screen.resources :refer [resources-screen]]
            ["expo-font" :as ef]
            ["react-native" :as rn]
            ["@react-navigation/native" :as rnn]
            ["@react-navigation/bottom-tabs" :as rnbt]
            ["@react-navigation/native-stack" :as rnns]
            ["@expo/vector-icons" :refer [FontAwesome5
                                          MaterialIcons]]))

(js/require "../global.css")
(js/require "react-native-gesture-handler")

(def Stack (rnns/createNativeStackNavigator))
(def Tab (rnbt/createBottomTabNavigator))

(defn root []
  [:> rnn/NavigationContainer
   [:> Tab.Navigator {:initialRouteName "Home"
                      :screenOptions {:tabBarShowLabel false}}
    [:> Tab.Screen {:name "Home"
                    :component (r/reactify-component home-screen)
                    :options {:headerShown false
                              :tabBarIcon #(let [{size :size
                                                  color :color} (js->clj % {:keywordize-keys true})]
                                             (-> [:> FontAwesome5 {:name "home"
                                                                   :color color
                                                                   :size size}]
                                                 (r/as-element)))}}]
    [:> Tab.Screen {:name "SOS"
                    :component (r/reactify-component sos-screen)
                    :options {:headerShown false
                              
                              :tabBarIcon #(let [{size :size
                                                  color :color} (js->clj % {:keywordize-keys true})]
                                             (-> [:> MaterialIcons {:name "sos"
                                                                    :color color
                                                                    :size size}]
                                                (r/as-element)))}}]
    [:> Tab.Screen {:name "Resources"
                    :component (r/reactify-component resources-screen)
                    :options {:headerShown false
                              :tabBarIcon #(let [{size :size
                                                  color :color} (js->clj % {:keywordize-keys true})]
                                             (-> [:> MaterialIcons {:name "message"
                                                                    :color color
                                                                    :size size}]
                                                 (r/as-element)))}}]]])

(defn start
  {:dev/after-load true}
  []
  (r/set-default-compiler! (r/create-compiler {:function-components true}))
  (expo/render-root (r/as-element [:f> root])))
;  (expo/render-root (r/as-element [root])))

(defn init []
  (rf/reg-event-db
   :initialize-db
   (fn [db _]
     (-> db
         (assoc :user "Guest")
         (assoc :helpline-groups {:general {:displayName "General Mental Well-being"}
                                  :ns {:displayName "Service Helplines"}})
         (assoc :helplines [{:name "Institute of Mental Health"
                             :contact "6389 2222"
                             :operating-hours "24Hrs"
                             :group :general}
                            {:name "Samaritans of Singapore"
                             :contact "1767"
                             :operating-hours "24Hrs"}
                            {:name "National Care Helpline"
                             :contact "1800 202 6868"
                             :operating-hours "Daily 8am-12am"}
                            {:name "Silver Ribbon Singapore"
                             :contact "6385 3714"
                             :operating-hours "Weekdays 9am-5pm"}]))))

  (rf/reg-sub
   :user
   (fn [db _]
     (:user db)))

  (rf/reg-sub
   :helplines-groups
   (fn [db _]
     (-> db
         (select-keys [:helplines :helpline-groups]))))
  
  (rf/dispatch-sync [:initialize-db])
  (start))
