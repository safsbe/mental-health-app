import {Mulish_400Regular} from '@expo-google-fonts/mulish';
import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '@/utils/store';
import React from 'react';

import {expoDb, db} from '@/db';
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import {HeaderBackButton} from '@react-navigation/elements';
import {Text, Pressable, Alert} from 'react-native';
import {Octicons} from '@expo/vector-icons';
import StackLayout from './(articles)/_layout';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom light theme
const CustomTheme: Theme = DefaultTheme;
CustomTheme.colors.background = '#FFF';

export default function RootLayout() {
  // database
  useDrizzleStudio(expoDb);
  const {success: dbMigrationSuccess, error: dbMigrationError} = useMigrations(
    db,
    migrations,
  );
  useEffect(() => {
    if (dbMigrationSuccess) {
      console.log('Database migration successful.');
    } else {
      console.error('Database migration failed.');
    }
  });
  // END database

  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    Mulish_400Regular,
  });

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const [alias, purpose, appKnowledge, authToken] =
          await Promise.allSettled([
            AsyncStorage.getItem('alias'),
            AsyncStorage.getItem('purpose'),
            AsyncStorage.getItem('appKnowledge'),
            AsyncStorage.getItem('authToken'), // Switch this to proper SecureStore.
          ]).then(x =>
            x.map(v => (v.status === 'fulfilled' ? v.value : undefined)),
          );

        console.log(alias, purpose, appKnowledge, authToken);

        if (!authToken) {
          router.replace('/start');
        } else if (!alias || !purpose) {
          router.replace('/guest');
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
    <ReduxProvider store={store}>
      <ThemeProvider value={CustomTheme}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  // @ts-ignore
                  onPress={() =>
                    //changeToPortraitOrientation() &&
                    router.back()
                  }
                />
              ),
            }}
          />
          <Stack.Screen
            name="diary/index"
            options={{
              headerShown: true,
              headerShadowVisible: false,
              headerTitle: props => (
                <Text
                  {...props}
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#765000',
                  }}
                >
                  My Diary
                </Text>
              ),
              headerRight: props => (
                <Pressable
                  {...props}
                  onPress={() =>
                    Alert.alert(
                      'Welcome to the diary page!',
                      'Here, you can see all your diary data. To make changes, scroll to the bottom and click on the edit button.',
                    )
                  }
                >
                  <Octicons name="question" size={16} color="#765000" />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </ReduxProvider>
  );
}
