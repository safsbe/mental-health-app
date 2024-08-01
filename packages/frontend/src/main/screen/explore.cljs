(ns screen.explore
  (:require ["react-native" :as rn]))

(defn explore-screen [{navigation :navigation route :route}]
      (let [category (js->clj (.. route  -params -category))
            categories {:self {:name "About Self"}}
            articles [{:title "Know Your Personality"
                      :category :self
                      :mdText "### What is a personality test\n\nA robustly validated personality test can be a great source to gain insights of who you are. Most tests consist of a series of self-reported questions that is specially designed to measure characteristic patterns of people exhibit across various situation. However, it is not an exhaustive description of you, as you will change with every experience or knowledge gain over time. \n\n### History of Personality Test\n\nDo you know the earliest form of personality testing was seen in the late 18th century? One of the method involved the measurement of bumps on your skull, known as phrenology! It was believed that brain muscle would grow bigger in the specific brain areas that was associated with a brain function, in turn supposedly connect to a specific personality trait. However, it is now seen as a pseudoscience. \n\nOther early theories such as Freudian psychodynamic approach related personality to innate needs and drives while Jungian approaches personality to four human preferences: sensing, intuition, thinking and feeling. Since then, many psychologists have attempted to distinguish the different personality traits using statistical techniques to narrow down into fixed number of dimensions. \n\n### Types of Personality Test\n\nThe Big Five Theory is the most popular approach thus far and suggests that our personality can be described via five broad dimensions O.C.E.A.N – Openness, Conscientiousness, Extroversion, Agreeableness and Neuroticism.\n\nAlongside, there are a plethora of personality tests built on specific personality theories that examine various aspects of your life e.g., your workstyle, your language of love, your socializing preference etc. Most of the online tests are rather informal and meant to entertain or start conversation. Choose a formal and scientifically-backed one if you want a more reliable and valid result.\n\n### How to Get the Most Out of Your Personality Test\n\nThere is no need to prepare for a personality test as overthinking on the items may instead bias you to a certain “preferred” answer. The result can only be insightful if your responses is reflective of how you are in reality. Hence, here are some tips to navigate a personality test for a more accurate result:\n\n1. __Be honest__. This is not about presenting what you would like to be or an “ideal” you. It is about how you are majority of the time. If all the options do not seem to apply to you, choose the best fit. Do not fear to show a less positive side if that is your usual self. Afterall, you are the only one who is going to read the result. \n\n2. __Be consistent__. Some tests are very specific to certain scenario e.g., workspace. In such case, think specifically of your work self when approaching the items. Read the test instructions carefully too so you are certain of how the test works.\n\n3. __Don’t try to predict the result__. While this is called a test, it is not graded, so there is no need to “beat the test” by guessing what the options will lead to. This will more likely present an “ideal” self than the true self. One way is to not spend too much time dwelling on the item.\n\nTL:DR \n\nPersonality test can be a quick way to gain awareness of yourself and taking several personality tests allows for a more comprehensive assessment and understanding of why you think, feel or behave in certain ways. This in turn identify your strengths and weaknesses. But it is not an exhaustive or permanent description of how you are wired or who you can be! This is only the first step to help you work towards personal development, career planning, team building, or understanding your interpersonal dynamics!\n\n#### Try this!\n[https://www.truity.com/test/big-five-personality-test](https://www.truity.com/test/big-five-personality-test)\n[https://www.16personalities.com/free-personality-test](https://www.16personalities.com/free-personality-test)\n\n#### Want to know more? Here are some references for you to explore!\n[https://www.verywellmind.com/what-is-personality-testing-2795420](https://www.verywellmind.com/what-is-personality-testing-2795420)\n[https://www.psychologytoday.com/us/basics/personality/personality-tests](https://www.psychologytoday.com/us/basics/personality/personality-tests)\n[https://www.workstyle.io/best-personality-test](https://www.workstyle.io/best-personality-test)"}
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

        ; MAY NEED THIS SHIT LATER
        ;(map (fn [article]
        ;        (let [temp [{:title (:title article)
        ;                    :category (:category article)
        ;                    :body (-> (readFromFile (:fileLink article))
        ;                            (.then (fn [r] (.text r)))
        ;                            (.catch #(js/console.log %)))}]])
        ;        ;insert some shit here
        ;        )
        ;  articles)

        [:> rn/ScrollView
          [:> rn/Text
            (categories (keyword category))]

            ;[:> rn/Text file-value]

           (->> articles
               (filter (fn [{article-category :category}]
                         (= article-category category)))
               (map (fn [{title :title mdText :mdText :as article}]
                       [:> rn/Pressable {:style {:backgroundColor "white"
                                                 :borderRadius 12
                                                 :overflow "hidden"
                                                 ;:marginBottom 10
                                                 :marginLeft 20
                                                 :marginRight 20
                                                 :flex 1
                                                 :alignItems "center"
                                                 :justifyContent "center"
                                                 :height 32}
                                         :onPress #(navigation.navigate "Article" {:article article})}
                       [:> rn/Text {:style {:fontSize 16
                                            :paddingLeft 10
                                            :paddingRight 10}} 
                         title]]))
               (into [:> rn/View
                       [:> rn/Text {:style {:fontSize 24
                                           :marginLeft 20
                                           :marginRight 20
                                           :marginBottom 5}}
                       "Articles"]]))]))
