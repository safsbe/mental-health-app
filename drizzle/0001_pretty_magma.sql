PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Quotes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_Quotes`("id", "text") SELECT "id", "text" FROM `Quotes`;--> statement-breakpoint
DROP TABLE `Quotes`;--> statement-breakpoint
ALTER TABLE `__new_Quotes` RENAME TO `Quotes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `Quotes_text_unique` ON `Quotes` (`text`);