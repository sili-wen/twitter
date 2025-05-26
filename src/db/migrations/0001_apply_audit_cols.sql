ALTER TABLE "tweets" ADD COLUMN "created_at" timestamp (3) DEFAULT '2025-05-26T23:19:37.309Z' NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "updated_at" timestamp (3) DEFAULT '2025-05-26T23:19:37.309Z' NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "terminated_at" timestamp (3);