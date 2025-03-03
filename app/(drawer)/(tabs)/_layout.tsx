import {Tabs} from 'expo-router';
import {Image} from 'expo-image';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({size, color, focused}) => (
            <Image
              contentFit="contain"
              style={{width: 48, height: 48}}
              source={require('../../../assets/tab_icons/home.svg')}
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
              contentFit="contain"
              style={{width: 40, height: 40}}
              source={require('../../../assets/tab_icons/sos.svg')}
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
              contentFit="contain"
              style={{width: 48, height: 48}}
              source={require('../../../assets/tab_icons/feedback.svg')}
            />
          ),
        }}
      />
    </Tabs>
  );
}
