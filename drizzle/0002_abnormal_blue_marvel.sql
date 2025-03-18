ALTER TABLE `DIARY_MOMENTS` RENAME COLUMN "id" TO "ID";--> statement-breakpoint
ALTER TABLE `DIARY_MOMENTS` RENAME COLUMN "type" TO "TYPE";--> statement-breakpoint
DROP INDEX `DIARY_MOMENTS_ENTRY_ID_id_unique`;--> statement-breakpoint
ALTER TABLE `DIARY_MOMENTS` ADD `BODY` text;--> statement-breakpoint
CREATE UNIQUE INDEX `DIARY_MOMENTS_ENTRY_ID_ID_unique` ON `DIARY_MOMENTS` (`ENTRY_ID`,`ID`);--> statement-breakpoint
ALTER TABLE `DIARY_ENTRIES` ADD `SLEEP_START` integer;--> statement-breakpoint
ALTER TABLE `DIARY_ENTRIES` ADD `SLEEP_END` integer;--> statement-breakpoint
ALTER TABLE `DIARY_ENTRIES` ADD `AWOKEN_COUNT` integer;--> statement-breakpoint
ALTER TABLE `DIARY_ENTRIES` ADD `NAP_COUNT` integer;--> statement-breakpoint
ALTER TABLE `DIARY_ENTRIES` ADD `NAP_DURATION` integer;