(ns frontend.app
  (:require ["expo" :as ex]
            [shadow.expo :as expo]
            ["react" :as react]
            ["react-native" :as rn]
            [reagent.core :as r]))

(defn root []
  [:> rn/View {:style {:flex 1
                       :justifyContent "center"
                       :alignItems "center"}}
   [:> rn/Text "Hello World!"]])

(defn start
  {:dev/after-load true}
  []
  (expo/render-root (r/as-element [root])))

(defn init []
  ; (rf/dispatch-sync [:initialize-db])
  (start))
