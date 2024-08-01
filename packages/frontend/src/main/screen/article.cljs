(ns screen.article
  (:require [reagent.core :as r]
            ["react-native" :as rn]
            ["@ronradtke/react-native-markdown-display" :default Markdown]))

(defn article-screen [{navigation :navigation route :route}]
  (let [article (:article (.-params route))
        title (:title article)
        mdText (:mdText article)]
    (navigation.setOptions #js{:title title})
    (js/console.log (str Markdown))
    [:> rn/ScrollView {:style {:marginLeft 20
                         :marginRight 20}}
      ;(js/console.log mdText)
      [:> Markdown {:style {:heading3 {:fontSize 24
                                       :marginTop 10
                                       :fontWeight :bold
                                       :textDecorationLine :underline}
                            :body {:fontSize 16}
                            :link {:color :blue}}}
     mdText]]))
