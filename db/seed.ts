import type {drizzle} from 'drizzle-orm/expo-sqlite';
import * as schemas from '@/db/schema';
import quoteData from '../assets/quotes.json';

export type SeedModes = 'reset';

export type SeedOptions = {
  db: ReturnType<typeof drizzle>,
  mode: SeedModes,
}

type ModelSeedMapping = Record<string, {
  reset?: Function,
}>;

const modelSeedMapping: ModelSeedMapping = {
  Quotes: {
    reset: resetQuotes,
  }
}

export async function seed({db, mode}: SeedOptions) {
  console.log(`- Database Seeder (mode: ${mode})) -`);
  for (let modelName of Object.keys(modelSeedMapping)) {
    console.log(`Seeding ${modelName}...`);
    await modelSeedMapping[modelName][mode]!(db);
    console.log(`Seeding complete for ${modelName}`);
  }
}

export async function resetQuotes(db: ReturnType<typeof drizzle>) {
  await db.delete(schemas.quotes);
  const result = await db.insert(schemas.quotes).values(quoteData.map(x => {return {text: x.quote}}));
}
