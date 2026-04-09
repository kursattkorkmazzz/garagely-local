ALTER TABLE `assets` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `assets` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `assets` ADD `status` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `dates` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `dates` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `distances` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `distances` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `money` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `money` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `volumes` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `volumes` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vehicles` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`brand` text NOT NULL,
	`model` text NOT NULL,
	`year` integer NOT NULL,
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
INSERT INTO `__new_vehicles`("id", "updated_at", "created_at", "brand", "model", "year", "plate", "color", "vin", "coverImageId", "fuelType", "bodyType", "transmissionType", "purchaseDateId", "purchasePriceId", "purchaseOdometerId") SELECT "id", "updated_at", "created_at", "brand", "model", "year", "plate", "color", "vin", "coverImageId", "fuelType", "bodyType", "transmissionType", "purchaseDateId", "purchasePriceId", "purchaseOdometerId" FROM `vehicles`;--> statement-breakpoint
DROP TABLE `vehicles`;--> statement-breakpoint
ALTER TABLE `__new_vehicles` RENAME TO `vehicles`;--> statement-breakpoint
PRAGMA foreign_keys=ON;