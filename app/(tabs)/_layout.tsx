import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color, focused }) => (
            <Image
              style={{ width: size, height: size }}
              source={require("../../assets/tab_icons/Home_Button.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ size, color, focused }) => (
            <Image
              style={{ width: size, height: size }}
              source={require("../../assets/tab_icons/SOS_Button.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarIcon: ({ size, color, focused }) => (
            <Image
              style={{ width: size, height: size }}
              source={require("../../assets/tab_icons/Feedback_Button.png")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
