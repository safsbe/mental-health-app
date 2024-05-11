(ns screen.article
  (:require [reagent.core :as r]
            ["react-native" :as rn]))

(defn article-screen [{navigation :navigation route :route}]
  (let [article (:article (.-params route))
        title (:title article)
        sections (:sections article)]
    (navigation.setOptions #js{:title title})
    (->> sections
         (map (fn [{title :title body :body}]
                [:> rn/View {:style {:marginLeft :20px
                                     :marginRight :20px}}
                 [:> rn/Text {:style {:fontSize "16px"
                                      :marginTop "10px"
                                      :fontWeight :bold
                                      :textDecorationLine :underline}}
                  title]
                 [:> rn/Text {:style {:fontSize :14px}} 
                  body]]))
         (into [:> rn/ScrollView]))))
