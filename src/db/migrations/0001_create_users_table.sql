CREATE TABLE "users" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL,
	"email" varchar(128) NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "user_id" varchar(64);--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;