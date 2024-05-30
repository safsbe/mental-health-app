(ns component.articles
  (:require ["react-native" :as rn]
            ["expo-file-system" :as efs]))

(defn readThisFile []
  (js/console.log "line1")
  (-> ([:> efs/readAsStringAsync file])
      (.then (js/Promise.resolve 42)
             (js/console.log %))))