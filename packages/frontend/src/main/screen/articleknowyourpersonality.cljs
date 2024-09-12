(ns screen.articleknowyourpersonality
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["react-native-markdown-display" :default Markdown]
            ["react-native-pager-view" :default PagerView]))

(defn article-knowyourpersonality [{navigation :navigation route :route}]
  [:> PagerView {:style {:flex 1}}
    [:> rn/View 
      [:> rn/Text "test2"]]]
)