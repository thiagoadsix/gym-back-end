import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkoutExerciseColuns1699315140770 implements MigrationInterface {
    name = 'UpdateWorkoutExerciseColuns1699315140770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_7b0c9579a1c0ef6d5bd42f83282"`);
        await queryRunner.query(`ALTER TABLE "exercises" ALTER COLUMN "workout_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_89831f278682031ad72a256cf57"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_c6f5843226d44d29de529bcdd14"`);
        await queryRunner.query(`ALTER TABLE "workouts" ALTER COLUMN "student_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ALTER COLUMN "assessment_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_7b0c9579a1c0ef6d5bd42f83282" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_89831f278682031ad72a256cf57" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_c6f5843226d44d29de529bcdd14" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_c6f5843226d44d29de529bcdd14"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_89831f278682031ad72a256cf57"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_7b0c9579a1c0ef6d5bd42f83282"`);
        await queryRunner.query(`ALTER TABLE "workouts" ALTER COLUMN "assessment_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ALTER COLUMN "student_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_c6f5843226d44d29de529bcdd14" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_89831f278682031ad72a256cf57" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ALTER COLUMN "workout_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_7b0c9579a1c0ef6d5bd42f83282" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
