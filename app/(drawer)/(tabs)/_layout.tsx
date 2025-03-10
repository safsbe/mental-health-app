import {useEffect, useState} from 'react';
import {Tabs, router} from 'expo-router';
import {Image} from 'expo-image';
import {Text} from 'react-native';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      const alias = await AsyncStorage.getItem('alias');

      setName(alias || '');
    };

    fetchUserData();
  }, []);

  function DevLogoutUser() {
    const removeUserData = async () => {
      await AsyncStorage.multiRemove([
        'alias',
        'authToken',
        'purpose',
        'appKnowledge',
        'mood',
        'videoWatched',
      ]); // Remove all user info

      router.replace('/start'); // Navigate to login setup screen again
    };

    removeUserData();
  }

  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: 'black',
        headerShown: true,
        headerLeft: props => (
          <MaterialIcons
            name="menu"
            size={32}
            color="#765000"
            style={{marginLeft: 15}}
            {...props}
            // @ts-ignore
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerTitleAlign: 'left',
        headerTitle: props => (
          <Text
            {...props}
            onPress={() => DevLogoutUser()}
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#765000',
            }}
          >
            Hey {name}!
          </Text>
        ),
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
