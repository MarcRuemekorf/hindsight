CREATE TABLE "board" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"last_activity_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "board_column" (
	"id" text PRIMARY KEY NOT NULL,
	"board_id" text NOT NULL,
	"title" text NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "board_member" (
	"board_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "board_member_board_id_user_id_pk" PRIMARY KEY("board_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "post_it" (
	"id" text PRIMARY KEY NOT NULL,
	"board_id" text NOT NULL,
	"column_id" text NOT NULL,
	"content" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"position" integer NOT NULL,
	"archived_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "board" ADD CONSTRAINT "board_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_column" ADD CONSTRAINT "board_column_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_member" ADD CONSTRAINT "board_member_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_member" ADD CONSTRAINT "board_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_it" ADD CONSTRAINT "post_it_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_it" ADD CONSTRAINT "post_it_column_id_board_column_id_fk" FOREIGN KEY ("column_id") REFERENCES "public"."board_column"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_it" ADD CONSTRAINT "post_it_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "board_createdByUserId_idx" ON "board" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "boardColumn_boardId_position_idx" ON "board_column" USING btree ("board_id","position");--> statement-breakpoint
CREATE INDEX "boardMember_boardId_idx" ON "board_member" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX "boardMember_userId_idx" ON "board_member" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "postIt_boardId_idx" ON "post_it" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX "postIt_columnId_position_idx" ON "post_it" USING btree ("column_id","position");