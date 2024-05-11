(ns screen.explore
  (:require [reagent.core :as r]
            ["react-native" :as rn]))

(defn explore-screen [{navigation :navigation route :route}]
    (let [category (js->clj (.. route .-category .-params))
          categories {:self {:name "About Self"}}
          articles [{:title "Know Your Personality"
                     :category :self
                     :sections [{:title "What is a Personality Test"
                                 :body "A robustly validated personality test can be a great source to gain insights of who you are. Most tests consist of a series of self-reported questions that is specially designed to measure characteristic patterns of people exhibit across various situation. However, it is not an exhaustive description of you, as you will change with every experience or knowledge gain over time. "}
                                {:title "History of Personality Test"
                                 :body "Do you know the earliest form of personality testing was seen in the late 18th century? One of the method involved the measurement of bumps on your skull, known as phrenology! It was believed that brain muscle would grow bigger in the specific brain areas that was associated with a brain function, in turn supposedly connect to a specific personality trait. However, it is now seen as a pseudoscience. \n\nOther early theories such as Freudian psychodynamic approach related personality to innate needs and drives while Jungian approaches personality to four human preferences: sensing, intuition, thinking and feeling. Since then, many psychologists have attempted to distinguish the different personality traits using statistical techniques to narrow down into fixed number of dimensions. "}
                                {:title "Types of Personality Test"
                                 :body "The Big Five Theory is the most popular approach thus far and suggests that our personality can be described via five broad dimensions O.C.E.A.N – Openness, Conscientiousness, Extroversion, Agreeableness and Neuroticism.\n\nAlongside, there are a plethora of personality tests built on specific personality theories that examine various aspects of your life e.g., your workstyle, your language of love, your socializing preference etc. Most of the online tests are rather informal and meant to entertain or start conversation. Choose a formal and scientifically-backed one if you want a more reliable and valid result."}
                                {:title "How to Get the Most Out of Your Personality Test"
                                 :body "There is no need to prepare for a personality test as overthinking on the items may instead bias you to a certain “preferred” answer. The result can only be insightful if your responses is reflective of how you are in reality. Hence, here are some tips to navigate a personality test for a more accurate result:\n\n1. Be honest. This is not about presenting what you would like to be or an “ideal” you. It is about how you are majority of the time. If all the options do not seem to apply to you, choose the best fit. Do not fear to show a less positive side if that is your usual self. Afterall, you are the only one who is going to read the result. \n\n2. Be consistent. Some tests are very specific to certain scenario e.g., workspace. In such case, think specifically of your work self when approaching the items. Read the test instructions carefully too so you are certain of how the test works.\n\n3. Don’t try to predict the result. While this is called a test, it is not graded, so there is no need to “beat the test” by guessing what the options will lead to. This will more likely present an “ideal” self than the true self. One way is to not spend too much time dwelling on the item."}]}
                    {:title "Self-Care and Well Being"
                     :category :self
                     :sections [{:title "🌟 What is Self-Care 🌟"
                                 :body "Self-care is far more than just indulging in occasional treats, pampering sessions or putting everything on hold and disappear to do what you want. It is about prioritizing our needs, setting boundaries, and cultivating habits that rejuvenate us from within, helping us to refocus on our life goals with renewed energy and insights. "}
                                {:title "🌱 The Impact on Well-being"
                                 :body "In the journey of life, having fulfilling and meaningful existence is closely tied with having a healthy body and mind. Many a time, our self-sacrificing tendency to meet deadlines or over-bending our backs to help someone will leave us exhausted, tired and stressed. We then seek quick fixes to address our anger and dissatisfaction such as over-indulging on temporary feel-good relief (excessive partying/alcohol/activities-packed holiday/retail therapy etc). When we are done, we still feel drained, unable to sleep well and the cycle continues the next day.\n\nA better solution? Quality self-care has been found to improve our mental and physical well-being. When we feel recharged, we look better and feel good, and we can approach things with more positivity, in turn derive more happiness. As we factor ourselves into the equation of living, we prioritize our well-being. And not only do we elevate our own lives, we then create a ripple effect of positivity that touches those around us. By shining brightly from within, we inspire others to embark on their own journey of self-discovery and self-love."}
                                {:title "🌿 How to Self-Care"
                                 :body "Self-care centred on caring and optimising our sources of energy. Remember, being recharged means we look and feel good.\n\nThe food we eat. World Health Organisation defined healthy eating as having good nutrition i.e., eating well balanced meals that adequately support your body’s need. This means that there is no one type of healthy diet! It all depends on what your palates, dietary restrictions and nutrition needs are. When our body is nourishingly fed, it promotes our immune function, in turn decreases risk of diseases, including that of mental health-related conditions!\n\nTips on healthy eating? See here.\n\nOur sleep routine. Heard of waking up on the wrong side of the bed? This is one indication that sleep do affect our state of mind. During sleep, our brain and organs can ramp down to recover itself, e.g., removing toxins, process emotional information etc. Insufficient sleep hinders this process. That is akin to us holding on to an accumulating weight of these stress that increases our risk of developing mental health issues. A vicious cycle can occur as our mental health deteriorates, it can make it harder to fall to sleep.\n\nUnderstand more about sleep and learn about your sleep cycle here.\n\nOur physical activity. Regular physical activity was found to improves our brain function, sleep, state of mind and also strengthened our physical strength, endurance and motor function. This is because during exercise, our body produces more neurochemicals that are linked to “feeling good”, sleepiness and reduced sensitivity to pain. This helps to reduce stress, sleep better and facilitates recovery from illnesses or ability to think more clearly.\n\nOur state of mind. How we think and feel can affect how we make decision. When we are plagued with negativity, it can stop us from seeing solutions. So pay attention to our thoughts and identify those that are unhelpful. Challenge them to discern if it is emotional talking or facts.\n\nTry this activity here to help you challenge your unhealthy thoughts."}
                                {:title "🌸Self-Care Builds Resilience"
                                 :body "Self-care empowers us to cultivate emotional resilience in the face of life's challenges. By tending to our emotional needs, practicing self-compassion, and seeking support when needed, we develop the inner strength to navigate adversity with grace and courage. We can also become better equipped to nurture healthy and fulfilling relationships as we cultivate a deeper sense of self-awareness and authenticity, that enriches our connections with others."}]}
                  ]]
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
                                            :marginBottom "10px"
                                            :marginLeft :20px
                                            :marginRight :20px
                                            :padding "20px"
                                            :height :32px
                                            :flex 1
                                            :alignItems :center}
                                    :onPress #(navigation.navigate "Article" {:article article})}
                   [:> rn/Text {:style {:fontSize :16px
                                        :paddingLeft :10px
                                        :paddingRight :10px}} 
                    title]]))
           (into [:> rn/View
                  [:> rn/Text {:style {:fontSize "24px"
                                       :marginLeft :20px
                                       :marginRight :20px}}
                   "Articles"]]))))
