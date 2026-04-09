CREATE TABLE `vehicles` (
	`id` text PRIMARY KEY GENERATED ALWAYS AS (5545aa5b-eb35-4ff4-97f1-1a1c2b18ae92) VIRTUAL NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`brand` text NOT NULL,
	`model` text NOT NULL,
	`year` text NOT NULL,
	`plate` text NOT NULL,
	`color` text,
	`vin` text,
	`coverImageId` text,
	`fuelType` text,
	`bodyType` text,
	`transmissionType` text,
	`purchaseDateId` text,
	`purchasePriceId` text,
	`purchaseOdometerId` text
);
--> statement-breakpoint
ALTER TABLE `assets` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `assets` ADD `id` text PRIMARY KEY GENERATED ALWAYS AS (5545aa5b-eb35-4ff4-97f1-1a1c2b18ae92) VIRTUAL NOT NULL;