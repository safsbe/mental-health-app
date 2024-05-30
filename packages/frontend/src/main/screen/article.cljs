(ns screen.article
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["react-native-markdown-display" :refer [Markdown]]))

(defn article-screen [{navigation :navigation route :route}]
  (let [article (:article (.-params route))
        title (:title article)
        body (:body article)]
    (navigation.setOptions #js{:title title})
    ;(js/console.log (str title))
    [:> rn/View {:style {:marginLeft 20
                          :marginRight 20}}
      (js/console.log body)
      [:> Markdown ;{:style {:fontSize "16px"
                    ;      :marginTop "10px"
                     ;     :fontWeight :bold
                      ;    :textDecorationLine :underline}}
      body]]
      (into [:> rn/ScrollView])))
