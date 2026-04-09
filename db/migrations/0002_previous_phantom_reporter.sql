CREATE TABLE `dates` (
	`id` text PRIMARY KEY GENERATED ALWAYS AS (7e531c33-80f6-4e18-a18e-0ba863d3f70c) VIRTUAL NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`date` integer NOT NULL,
	`timezone` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `distances` (
	`id` text PRIMARY KEY GENERATED ALWAYS AS (7e531c33-80f6-4e18-a18e-0ba863d3f70c) VIRTUAL NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `money` (
	`id` text PRIMARY KEY GENERATED ALWAYS AS (7e531c33-80f6-4e18-a18e-0ba863d3f70c) VIRTUAL NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `volumes` (
	`id` text PRIMARY KEY GENERATED ALWAYS AS (7e531c33-80f6-4e18-a18e-0ba863d3f70c) VIRTUAL NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `assets` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `assets` ADD `id` text PRIMARY KEY GENERATED ALWAYS AS (7e531c33-80f6-4e18-a18e-0ba863d3f70c) VIRTUAL NOT NULL;--> statement-breakpoint
ALTER TABLE `vehicles` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `vehicles` ADD `id` text PRIMARY KEY GENERATED ALWAYS AS (7e531c33-80f6-4e18-a18e-0ba863d3f70c) VIRTUAL NOT NULL;