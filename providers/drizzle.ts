import {drizzle} from 'drizzle-orm/expo-sqlite';
import {createContext, useContext} from 'react';

type DrizzleDb = ReturnType<typeof drizzle>;

const DrizzleContext = createContext<DrizzleDb>(null!);
export const DrizzleProvider = DrizzleContext.Provider;
export function useDrizzle(): DrizzleDb {
  return useContext(DrizzleContext);
}
