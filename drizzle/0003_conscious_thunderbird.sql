PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_DiaryEntries` (
	`createdOn` integer DEFAULT (unixepoch()) NOT NULL,
	`moodScale` integer
);
--> statement-breakpoint
INSERT INTO `__new_DiaryEntries`("createdOn", "moodScale") SELECT "createdOn", "moodScale" FROM `DiaryEntries`;--> statement-breakpoint
DROP TABLE `DiaryEntries`;--> statement-breakpoint
ALTER TABLE `__new_DiaryEntries` RENAME TO `DiaryEntries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;