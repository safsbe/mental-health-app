import {Mulish_400Regular} from '@expo-google-fonts/mulish';
import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {createContext, useEffect, useState} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SQLiteProvider, openDatabaseSync} from 'expo-sqlite';
import {drizzle} from 'drizzle-orm/expo-sqlite';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin';
import {seed} from '@/db/seed';
import {store} from '@/utils/store';
import {Provider} from 'react-redux';
import {DrizzleProvider} from '@/providers/drizzle';

const expoDb = openDatabaseSync('main.db', {enableChangeListener: true});
const db = drizzle(expoDb);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom light theme
const CustomTheme: Theme = DefaultTheme;
CustomTheme.colors.background = '#FFF';


export default function RootLayout() {
  useDrizzleStudio(expoDb);
  const {success: dbMigrationSuccess, error: dbMigrationError} = useMigrations(db, migrations);
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    Mulish_400Regular,
  });

  useEffect(() => {
    console.log("DB STAT - Success: " + dbMigrationSuccess);
    console.log("DB STAT - Error " + dbMigrationError);

    if (dbMigrationSuccess) {
      seed({
        db: db,
        mode: 'reset',
      });
    }
  }, [dbMigrationSuccess, dbMigrationError]);

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
    <Provider store={store}>
      <DrizzleProvider value={db}>
    <ThemeProvider value={CustomTheme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </ThemeProvider>
      </DrizzleProvider>
      </Provider>
  );
}
