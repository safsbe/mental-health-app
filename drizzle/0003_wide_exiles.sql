ALTER TABLE `DIARY_MOMENTS` RENAME TO `DIARY_ENTRY_LIST_ITEMS`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_DIARY_ENTRY_LIST_ITEMS` (
	`ID` text PRIMARY KEY NOT NULL,
	`ENTRY_ID` text NOT NULL,
	`TYPE` integer NOT NULL,
	`BODY` text NOT NULL,
	FOREIGN KEY (`ENTRY_ID`) REFERENCES `DIARY_ENTRIES`(`ENTRY_DATE`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_DIARY_ENTRY_LIST_ITEMS`("ID", "ENTRY_ID", "TYPE", "BODY") SELECT "ID", "ENTRY_ID", "TYPE", "BODY" FROM `DIARY_ENTRY_LIST_ITEMS`;--> statement-breakpoint
DROP TABLE `DIARY_ENTRY_LIST_ITEMS`;--> statement-breakpoint
ALTER TABLE `__new_DIARY_ENTRY_LIST_ITEMS` RENAME TO `DIARY_ENTRY_LIST_ITEMS`;--> statement-breakpoint
PRAGMA foreign_keys=ON;