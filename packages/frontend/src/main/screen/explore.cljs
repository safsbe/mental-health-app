(ns screen.explore
  (:require [reagent.core :as r]
            ["react-native" :as rn]))

(defn explore-screen [{navigation :navigation route :route}]
    (let [category (js->clj (.-category (.-params route)))
          categories {:self {:name "About Self"}}
          articles [{:title "Know Your Personality"
                     :category :self
                     :sections [{:title "Lorem Ipsum"
                                 :body "Sit Amet."}]}]]
      [:> rn/ScrollView
       [:> rn/Text
        (categories (keyword category))]]

      (->> articles
           (filter (fn [{article-category :category}]
                     (= article-category category)))
           (map (fn [{title :title :as article}]
                  (js/console.log (str article))
                  [:> rn/Pressable {:style {:background "#FFF"
                                            :borderRadius "12px"
                                            :marginBottom "10px"}
                                    :onPress #(navigation.navigate "Article" {:article article})}
                   [:> rn/Text title]]))
           (into [:> rn/View
                  [:> rn/Text {:style {:fontSize "24px"}}
                   "Articles"]]))))
