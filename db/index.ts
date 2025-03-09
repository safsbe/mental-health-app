import {drizzle} from 'drizzle-orm/expo-sqlite';
import {SQLiteProvider, openDatabaseSync} from 'expo-sqlite';

export const expoDb = openDatabaseSync('main.db');
export const db = drizzle(expoDb);
