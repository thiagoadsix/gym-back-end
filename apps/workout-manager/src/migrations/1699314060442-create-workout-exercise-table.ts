import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkoutExerciseTable1699314060442
  implements MigrationInterface
{
  name = "CreateWorkoutExerciseTable1699314060442";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" text NOT NULL, "sets" integer NOT NULL, "repetitions" integer array NOT NULL, "video_link" text, "observation" text, "type" character(1) NOT NULL, "workout_id" uuid, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "workouts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "objective" text, "phase" integer, "start_date" date NOT NULL, "end_date" date NOT NULL, "student_id" uuid, "assessment_id" uuid, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_7b0c9579a1c0ef6d5bd42f83282" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_89831f278682031ad72a256cf57" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_c6f5843226d44d29de529bcdd14" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_c6f5843226d44d29de529bcdd14"`
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_89831f278682031ad72a256cf57"`
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_7b0c9579a1c0ef6d5bd42f83282"`
    );
    await queryRunner.query(`DROP TABLE "workouts"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
  }
}
