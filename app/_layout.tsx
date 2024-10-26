import {Mulish_400Regular} from '@expo-google-fonts/mulish';
import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom light theme
const CustomTheme: Theme = DefaultTheme;
CustomTheme.colors.background = '#FFF';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    Mulish_400Regular,
  });

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const [alias, dob, goals, authToken] = await Promise.allSettled([
          AsyncStorage.getItem('alias'),
          AsyncStorage.getItem('dob'),
          AsyncStorage.getItem('goals'),
          AsyncStorage.getItem('authToken'), // Switch this to proper SecureStore.
        ]).then(x =>
          x.map(v => (v.status === 'fulfilled' ? v.value : undefined)),
        );

        console.log(alias, dob, goals, authToken);

        if (!authToken) {
          router.replace('/login');
        } else if (!alias || !dob || !goals) {
          router.replace('/onboarding');
        } else {
          setIsReady(true); // Data exists, app can proceed
        }
      } catch (error) {
        console.error('Error checking user data: ', error);
      }
    };

    if (loaded) {
      SplashScreen.hideAsync();
      checkUserData(); // Check user data in AsyncStorage
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(drawer)" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
