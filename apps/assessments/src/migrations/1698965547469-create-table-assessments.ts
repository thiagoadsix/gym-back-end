import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAssessments1698965547469 implements MigrationInterface {
    name = 'CreateTableAssessments1698965547469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."assessment_type" AS ENUM('POLLOCK_3')`);
        await queryRunner.query(`CREATE TABLE "assessments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "assessment_type" "public"."assessment_type" NOT NULL, "assessment_data" jsonb, "assessed_at" TIMESTAMP NOT NULL DEFAULT now(), "student_id" uuid, CONSTRAINT "PK_a3442bd80a00e9111cefca57f6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_060c5cb0c29c986eabfd77c52d3" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_060c5cb0c29c986eabfd77c52d3"`);
        await queryRunner.query(`DROP TABLE "assessments"`);
        await queryRunner.query(`DROP TYPE "public"."assessment_type"`);
    }

}
