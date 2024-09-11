(ns data.events
  (:require [re-frame.core :as rf]
            ["@expo/vector-icons" :as evi]))

(defn register-initialize-db []
  (rf/reg-event-db
   :initialize-db
   (fn [db _]
     (-> db
         (assoc :user-preferred-name nil)
         (assoc :user-mode nil)
         (assoc :categories {:self
                             {:name "Self"
                              :color "#FFF7D6"
                              :image (js/require "../assets/home_explore_self.svg")}
                             :self-card
                             {:name "Self-Care"
                              :color "#DDE5FF"
                              :image (js/require "../assets/home_explore_self_care.svg")}
                             :mental-health
                             {:name "About Mental Health"
                              :color "#DEF7E5"
                              :image (js/require "../assets/home_explore_mental_health.svg")}
                             :other
                             {:name "About Others"
                              :color "#FFE7E7"
                              :image (js/require "../assets/home_explore_others.svg")}})
         (assoc :helpline-groups {:general {:displayName "General Mental Well-being"}
                                  :ns {:displayName "Service Helplines"}})
         (assoc :helplines [{:name "Institute of Mental Health"
                             :contact "6389 2222"
                             :operating-hours "24Hrs"
                             :group :general}
                            {:name "Samaritans of Singapore"
                             :contact "1767"
                             :operating-hours "24Hrs"}
                            {:name "National Care Helpline"
                             :contact "1800 202 6868"
                             :operating-hours "Daily 8am-12am"}
                            {:name "Silver Ribbon Singapore"
                             :contact "6385 3714"
                             :operating-hours "Weekdays 9am-5pm"}])
         (assoc :mindful-pause {:audio
                                 [{:name "Breathe"
                                   ;:audio-file (js/require "../assets/mindful_minutes/breathe.mp3")
                                   :audio-file (js/require "../assets/love_wins_all.mp3") ;since I dont have the other audios yet on 290724
                                   :icon [:> evi/MaterialIcons {:name "air"
                                                                :size 20
                                                                :color "#A5A5A5"}]}
                                  {:name "Take a sip of tea"
                                   ;:audio-file (js/require "../assets/mindful_minutes/sip_tea.mp3")
                                   :audio-file (js/require "../assets/love_wins_all.mp3") ;since I dont have the other audios yet on 290724
                                   :icon [:> evi/SimpleLineIcons {:name "cup" 
                                                                  :size 20 
                                                                  :color "#A5A5A5"}]}
                                  {:name "Take a walk"
                                   ;:audio-file "../assets/mindful_minutes/sip_tea.mp3"
                                   :audio-file (js/require "../assets/love_wins_all.mp3") ;since I dont have the other audios yet on 290724
                                   :icon [:> evi/MaterialIcons {:name "directions-walk" 
                                                                :size 20 
                                                                :color "#A5A5A5"}]}
                                  {:name "Look at the sky"
                                   ;:audio-file "../assets/mindful_minutes/observe_sky.mp3"
                                   :audio-file (js/require "../assets/love_wins_all.mp3") ;since I dont have the other audios yet on 290724
                                   :icon [:> evi/MaterialIcons {:name "cloud" 
                                                                :size 20 
                                                                :color "#A5A5A5"}]}]})))))

(defn register-other []
    (rf/reg-sub
   :user
   (fn [db _]
     (:user-preferred-name db)))

  (rf/reg-sub
   :user-mode
   (fn [db _]
     (:user-mode db)))

  (rf/reg-event-db
   :set-user-mode
   (fn [db [_ user-mode]]
     (assoc db :user-mode user-mode)))

  (rf/reg-event-db
   :set-user-preferred-name
   (fn [db, [_ user-preferred-name]]
     (assoc db :user-prefered-name user-preferred-name)))

  (rf/reg-sub
   :user-feeling-scale/rating
   (fn [db _]
     (:user-feeling-scale/rating db)))

  (rf/reg-event-db
   :user-feeling-scale/set-rating
   (fn [db [_ rating]]
     (assoc db :user-feeling-scale/rating rating)))

  (rf/reg-sub
   :helplines-groups
   (fn [db _]
     (-> db
         (select-keys [:helplines :helpline-groups]))))

  (rf/reg-sub
   :mindful-pause-audio
   (fn [db _]
     (-> db
         (:mindful-pause)
         (:audio))))

  (rf/reg-sub
   :play-track
   (fn [db _]
     (-> db
         (:av-player/current-track))))

  (rf/reg-event-db
   :play-track
   (fn [db [_ {audio-file :audio-file}]]
     (assoc db
            :av-player/current-track audio-file)))

  (rf/reg-sub
   :start-play-track
   (fn [db _]
     (-> db
         (:av-player/playing))))
  
  (rf/reg-event-db
   :set-playing-mode
   (fn [db playing]
     (assoc db :av-player/playing playing)))

  (rf/reg-sub
   :categories
   (fn [db _]
     (-> db
         :categories))))

(defn register-all []
  (register-initialize-db)
  (register-other))
