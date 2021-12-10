CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"class" TEXT NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student" TEXT NOT NULL,
	"class" TEXT NOT NULL,
	"tags" TEXT NOT NULL,
	"answered" BOOLEAN NOT NULL,
	"submitAt" VARCHAR(255) NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"answeredAt" TEXT NOT NULL,
	"answeredBy" TEXT NOT NULL,
	"answer" TEXT NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "answers" ADD CONSTRAINT "answers_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");



