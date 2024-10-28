import { sql } from 'drizzle-orm';
import {int, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const diaryEntries = sqliteTable('DiaryEntries', {
  createdOn: int({mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
  moodScale: int(),
});
