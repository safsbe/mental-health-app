(ns frontend.app
  (:require [re-frame.core :as rf]
            [reagent.core :as r]
            [shadow.expo :as expo]
            [data.events :as data-events]
            [shell :as shell]))

(js/require "../global.css")
(js/require "react-native-gesture-handler")

(defn start
  {:dev/after-load true}
  []
  (r/set-default-compiler! (r/create-compiler {:function-components true}))
  (expo/render-root (r/as-element [:f> shell/root])))

(defn init []
  (data-events/register-all)
  (rf/dispatch-sync [:initialize-db])
  (start))
