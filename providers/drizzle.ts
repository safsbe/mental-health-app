import { drizzle } from 'drizzle-orm/expo-sqlite';
import {createContext, useContext} from 'react';

type DrizzleDB = ReturnType<typeof drizzle>;

const DrizzleContext = createContext<DrizzleDB>(null!);
export const DrizzleProvider = DrizzleContext.Provider;
export function useDrizzle(): DrizzleDB {
  return useContext(DrizzleContext);
}
