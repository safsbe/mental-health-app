CREATE TABLE `DiaryEntries` (
	`createdOn` text DEFAULT (current_timestamp) NOT NULL,
	`moodScale` integer
);
--> statement-breakpoint
CREATE TABLE `UserPrefs` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
