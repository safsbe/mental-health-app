import {integer, sqliteTable, text, unique} from 'drizzle-orm/sqlite-core';

export const DiaryEntries = sqliteTable('DIARY_ENTRIES', {
  entryDate: text('ENTRY_DATE').primaryKey(),
  updatedOn: text('UPDATED_ON').notNull(),
  moodRating: integer('MOOD_RATING'),
  sleepRating: integer('SLEEP_RATING'),
  sleepStart: integer('SLEEP_START'),
  sleepEnd: integer('SLEEP_END'),
  awokenCount: integer('AWOKEN_COUNT'),
  napCount: integer('NAP_COUNT'),
  napDuration: integer('NAP_DURATION'),
});

export const enum DiaryEntryListTypes {
  MOMENT_BEST = 1,
  MOMENT_WORST = 2,
  EVENT_SIGNIFICANT = 3,
  WHAT_HAPPENED = 4,
  MEDICINE_TAKEN = 5,
  TAGS = 6,
}

export const DiaryEntryListItems = sqliteTable(
  'DIARY_ENTRY_LIST_ITEMS',
  {
    id: text('ID').primaryKey(),
    entryId: text('ENTRY_ID')
      .notNull()
      .references(() => DiaryEntries.entryDate, {onDelete: 'cascade'}),
    type: integer('TYPE').notNull(),
    body: text('BODY').notNull(),
  },
);
