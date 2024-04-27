(ns components.daily-feeling-scale
  (:require [reagent.core :as r]
            ["react-native" :as rn]))

(defn feeling-scale []
  [:> rn/View {:style 
