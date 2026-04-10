CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`mimeType` text,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`size` integer,
	`creationTime` integer,
	`status` text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dates` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`date` integer NOT NULL,
	`timezone` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `distances` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `money` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `volumes` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
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
