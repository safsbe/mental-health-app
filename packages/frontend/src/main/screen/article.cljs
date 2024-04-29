(ns screen.article
  (:require [reagent.core :as r]
            ["react-native" :as rn]))

(defn article-screen [{route :route}]
  (let [article (:article (.-params route))
        title (:title article)
        sections (:sections article)]
    (->> sections
         (map (fn [{title :title body :body}]
                [:> rn/View
                 [:> rn/Text {:style {:fontSize "24px"
                                      :marginTop "10px"}}
                  title]
                 [:> rn/Text body]]))
         (into [:> rn/ScrollView]))))
