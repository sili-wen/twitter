CREATE TABLE "follows" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"follower_id" varchar(64) NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone,
	CONSTRAINT "follows_no_self_follow" CHECK ("follows"."follower_id" != "follows"."user_id")
);
--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "follows_user_id_idx" ON "follows" USING btree ("user_id");