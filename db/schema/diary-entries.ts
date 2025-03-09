import {integer, sqliteTable, text, unique} from 'drizzle-orm/sqlite-core';

export const diaryEntries = sqliteTable('DIARY_ENTRIES', {
  entryDate: text('ENTRY_DATE').primaryKey(),
  updatedOn: text('UPDATED_ON').notNull(),
  moodRating: integer('MOOD_RATING'),
});

export const diaryMoments = sqliteTable(
  'DIARY_MOMENTS',
  {
    entryId: text('ENTRY_ID')
      .notNull()
      .references(() => diaryEntries.entryDate, {onDelete: 'cascade'}),
    id: integer().notNull(),
    type: integer(),
  },
  t => [unique().on(t.entryId, t.id)],
);
