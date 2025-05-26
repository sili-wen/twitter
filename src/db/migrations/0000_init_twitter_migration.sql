CREATE TABLE "tweets" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"message" varchar(512) NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone
);
