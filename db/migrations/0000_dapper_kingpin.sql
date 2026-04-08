CREATE TABLE `assets` (
	`id` text PRIMARY KEY GENERATED ALWAYS AS (a9273e41-8f16-4f53-989e-678de76b7ed5) VIRTUAL NOT NULL,
	`updated_at` integer,
	`created_at` integer NOT NULL,
	`mimeType` text,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`size` integer,
	`creationTime` integer
);
