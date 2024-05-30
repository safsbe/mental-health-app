(ns screen.explore
  (:require [cljs.core.async :as async]
            [cljs.core.async.interop :refer-macros [<p!]]
            [reagent.core :as r]
            ["react-native" :as rn]
            ["expo-asset" :as ea]
            ["expo-file-system" :as efs]
            ;[component.articles :refer [readThisFile]]
            ))

(def atomValue (r/atom nil))
(def fileValue (r/atom nil))

(defn readFromFile [fileUri]
  (-> (js/fetch fileUri)
      (.then (fn [r]
        (when-not (.-ok r)
          (throw (js/Error. "Could not fetch markdown file.")))
        (.text r)))
      (.then (fn [r]
          (reset! fileValue r))))) ; configured for changing atom value

;(defn readFromFile [fileUri]
;  (-> (js/fetch fileUri)
;      (.then (fn [r]
;        (when-not (.-ok r)
;          (throw (js/Error. "Could not fetch markdown file.")))
;        (.text r)))
;      (.then (fn [r]
;          r)))) ; configured for changing atom value

(defn processArticlesToAtom [atomName articles]
  (async/go (<p!
    (->> articles
      (map (fn [article]
        {:title (:title article)
        :category (:category article)
        :body (<p! (readFromFile (:fileLink article)))}))
        )))
  (js/console.log body))
      ;(swap! atomName (conj atomName ))))

;(js/console.log (type []))

(defn explore-screen [{navigation :navigation route :route}]
      (let [category (js->clj (.. route  -params -category))
            categories {:self {:name "About Self"}}
            articles [{:title "Know Your Personality"
                      :category :self
                      :fileLink "../assets/markdown/know-your-personality.md"}
                      ;:body (str (js/require "../assets/markdown/know-your-personality.md"))
                      ;:body (-> (js/require "../assets/markdown/know-your-personality.md")
                      ;           (<p! #(.loadAsync ea/Asset %))
                      ;          (.-localUri)
                      ;          (<p! (js/fetch))
                      ;          (.text))}]]
                      ;{:title "Autism Spectrum Disorder"
                      ; :category :self
                      ;:fileLink "../assets/markdown/know-your-personality.md"}
                      ]]
        ;(async/go
        ;  (let [fileValue (<p! (readFromFile "../assets/markdown/know-your-personality.md"))]
        ;    (try
        ;      (<p! (reset! atomValue fileValue))
        ;      (catch js/Error err (js/console.log (ex-cause err))))))

        ;(processArticlesToAtom atomValue articles)
        ;(-> (readFromFile "../assets/markdown/know-your-personality.md")
        ;    (.then (fn [r]
        ;      (js/console.log r))))

        ;(-> articles (fn [article]
        ;  (.then (processArticlesToAtom atomValue article)
        ;    (when-not (.-ok article)
        ;      (throw (js/Error. "Could not process article")))
        ;    (js/console.log %))))
        
        (map (fn [article]
                (let [temp [{:title (:title article)
                            :category (:category article)
                            :body (-> (readFromFile (:fileLink article))
                                    (.then (fn [r] (.text r)))
                                    (.catch #(js/console.log %)))}]])
                ;insert some shit here
                )
          articles)


        (js/console.log @atomValue)
        (js/console.log @fileValue)

        (when-let [file-value @atomValue]
          [:> rn/ScrollView
            [:> rn/Text
              (categories (keyword category))]

            ;[:> rn/Text file-value]

           (->> file-value
               (filter (fn [{article-category :category}]
                         (= article-category category)))
               (map (fn [{title :title :as article}]
                       (js/console.log (:body article))
                       [:> rn/Pressable {:style {:background :white
                                                 :borderRadius 12
                                                 :marginBottom 10
                                                 :marginLeft 20
                                                 :marginRight 20
                                                 :height 32
                                                 :flex 1
                                                 :alignItems :center}
                                         :onPress #(navigation.navigate "Article" {:article article})}
                       [:> rn/Text {:style {:fontSize 16
                                             :paddingLeft 10
                                             :paddingRight 10}} 
                         title]]))
               (into [:> rn/View
                       [:> rn/Text {:style {:fontSize 24
                                           :marginLeft 20
                                           :marginRight 20}}
                       "Articles"]]))])))
