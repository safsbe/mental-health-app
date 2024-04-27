(ns frontend.app
  (:require [re-frame.core :as rf]
            [reagent.core :as r]
            [shadow.expo :as expo]
            [screen.home :refer [home-screen]]
            [screen.sos :refer [sos-screen]]
            ["expo-font" :as ef]
            ["react-native" :as rn]
            ["@react-navigation/native" :as rnn]
            ["@react-navigation/bottom-tabs" :as rnbt]
            ["@react-navigation/native-stack" :as rnns]))

(js/require "../global.css")
(js/require "react-native-gesture-handler")

(def Stack (rnns/createNativeStackNavigator))
(def Tab (rnbt/createBottomTabNavigator))

(defn root []
;  [:> rnn/NavigationContainer
;   [:> Stack.Navigator {:initialRouteName "Home"}
;    [:> Stack.Screen {:name "Home"
;                      :component (r/reactify-component home-screen)}]
;    [:> Stack.Screen {:name "SOS"
;                      :component (r/reactify-component sos-screen)}]]])
  [:> rnn/NavigationContainer
   [:> Tab.Navigator {:initialRouteName :Home}
    [:> Tab.Screen {:name "Home"
                    :component (r/reactify-component home-screen)
                    :options {:headerShown false}}]
    [:> Tab.Screen {:name "SOS"
                    :component (r/reactify-component sos-screen)
                    :options {:headerShown false}}]]])

(defn start
  {:dev/after-load true}
  []
  (expo/render-root (r/as-element [:f> root])))
;  (expo/render-root (r/as-element [root])))

(defn init []
  (rf/reg-event-db
   :initialize-db
   (fn [db _]
     (assoc db :user "Guest")))

  (rf/reg-sub
   :user
   (fn [db _]
     (:user db)))
  
  (rf/dispatch-sync [:initialize-db])
  (start))
