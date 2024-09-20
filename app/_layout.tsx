import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const alias = await AsyncStorage.getItem('alias');
        const dob = await AsyncStorage.getItem('dob');
        const goals = await AsyncStorage.getItem('goals');

        if (!alias || !dob || !goals) {
          router.replace('/onboarding')
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false,  }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
