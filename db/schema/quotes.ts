import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quotes = sqliteTable('Quotes', {
  id: integer().primaryKey({autoIncrement: true}),
  text: text().notNull().unique(),
});
