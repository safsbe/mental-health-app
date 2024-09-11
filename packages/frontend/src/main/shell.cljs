(ns shell
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [screen.auth :refer [auth-screen]]
            [screen.home :refer [home-screen]]
            [screen.sos :refer [sos-screen]]
            [screen.resources :refer [resources-screen]]
            ["@expo/vector-icons" :as evi]
            ["@react-navigation/native" :as rnn]
            ["@react-navigation/bottom-tabs" :as rnbt]
            ["@react-navigation/native-stack" :as rnns]
            ["@expo/vector-icons" :refer [FontAwesome5
                                          MaterialIcons]]))

(defn- authenticated-navigator []
  (let [tab (rnbt/createBottomTabNavigator)
        navigator (.-Navigator tab)
        screen (.-Screen tab)]
    [:> navigator {:initialRouteName "Home"
                   :screenOptions {:headerShown false}}
     [:> screen {:name "Home"
                 :component (r/reactify-component home-screen)
                 :options {:headerShown false
                           :tabBarIcon #(let [{size :size
                                               color :color} (js->clj % {:keywordize-keys true})]
                                          (-> [:> FontAwesome5 {:name "home"
                                                                :color color
                                                                :size size}]
                                              (r/as-element)))}}]
     [:> screen {:name "SOS"
                 :component (r/reactify-component sos-screen)
                 :options {:headerShown false
                           :tabBarIcon #(let [{size :size
                                               color :color} (js->clj % {:keywordize-keys true})]
                                          (-> [:> MaterialIcons {:name "sos"
                                                                 :color color
                                                                 :size size}]
                                              (r/as-element)))}}]
     [:> screen {:name "Resources"
                 :component (r/reactify-component resources-screen)
                 :options {:headerShown false
                           :tabBarIcon #(let [{size :size
                                               color :color} (js->clj % {:keywordize-keys true})]
                                          (-> [:> MaterialIcons {:name "message"
                                                                 :color color
                                                                 :size size}]
                                              (r/as-element)))}}]]))

(defn root []
  (let [user-mode @(rf/subscribe [:user-mode])
        stack (rnns/createNativeStackNavigator)
        navigator (.-Navigator stack)
        screen (.-Screen stack)]
    [:> rnn/NavigationContainer
     [:> navigator {:screenOptions {:headerShown false}}
      (if-not user-mode
        [:> screen {:name "Auth"
                    :component (r/reactify-component auth-screen)}]
        [:> screen {:name "AuthenticatedArea"
                    :component (r/reactify-component authenticated-navigator)}])]]))
