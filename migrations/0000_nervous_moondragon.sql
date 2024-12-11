CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`message` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
