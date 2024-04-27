(ns frontend.app
  (:require ["react-native" :as rn]))


(defn home-screen
  [:> rn/View ; main flexbox
    {:style 
      {
        :flex 1 ; does not matter but it works better than display "flex"
        :justifyContent "top"
        :alignItems "center"}}
    [:> rn/View ; header
      {:style 
        {
          :flex 1
          :width "100%"
          :flexDirection "row"}}
      [:> rn/Image {:source menu-logo :style {:width 32 :height 32 :margin 4}}]
      [:> rn/Text ; image for now, no button yet -> realised this can be replaced through 
        {:style   ; react native navigation later on, but for prototype sake it works ig
          {
            :font-weight "bold"
            :font-size 28
            :margin 2
          }}
        "Mental Health App"]
    ]
    [:> rn/View
      {:style
        {
          :flex 14
          :width "100%"
          :backgroundColor "#d7f9f8"
        }}
      [:> rn/Text "Main content goes here"]
    ]
    [:> rn/View ; bottom navigation box
      {:style
        {
          :flex 1
          :width "100%"
        }}
      ;[:> rn/Text "final"]
      [:> rn/View]
    ]
   ]
)
