CREATE TABLE "feedbacks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"message" text NOT NULL,
	"rating" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "site_visits" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip_hash" varchar,
	"user_agent" text,
	"path" varchar,
	"visited_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "used_emails" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"reason" varchar(50) DEFAULT 'welcome_bonus',
	"used_at" timestamp DEFAULT now(),
	CONSTRAINT "used_emails_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "click_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "login_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_login_at" timestamp;--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;