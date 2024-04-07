(ns sbe.frontend.app
  (:require [react])
  (:require [reagent.core :as r])
  (:require [reagent.dom :as rd]))

(defn simple-text-div []
  [:div
   [:p "Hello World Test"]])

(defn init []
  (rd/render [simple-text-div]
             (.-body js/document))
  (println "Hello World?"))