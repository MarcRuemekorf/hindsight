ALTER TABLE "post_it" ALTER COLUMN "board_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post_it" ALTER COLUMN "column_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post_it" ALTER COLUMN "position" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post_it" ADD COLUMN "title" text NOT NULL;