import {Tabs} from 'expo-router';
import {Image} from 'expo-image';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({size, color, focused}) => (
            <Image
              style={{width: size, height: size}}
              source={require('../../assets/tab_icons/home.svg')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',
          tabBarIcon: ({size, color, focused}) => (
            <Image
              style={{width: size, height: size}}
              source={require('../../assets/tab_icons/sos.svg')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({size, color, focused}) => (
            <Image
              style={{width: size, height: size}}
              source={require('../../assets/tab_icons/feedback.svg')}
            />
          ),
        }}
      />
    </Tabs>
  );
}
