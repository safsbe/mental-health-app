import {text, sqliteTable} from 'drizzle-orm/sqlite-core';

export const userPrefs = sqliteTable('UserPrefs', {
  key: text().primaryKey(),
  value: text(),
});
