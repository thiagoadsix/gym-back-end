import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusStartDateEndDateColumnsIntoAssessmentTable1699448300829 implements MigrationInterface {
    name = 'AddStatusStartDateEndDateColumnsIntoAssessmentTable1699448300829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."assessment_status" AS ENUM('IN_PROGRESS', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "status" "public"."assessment_status" NOT NULL DEFAULT 'IN_PROGRESS'`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "start_date" date`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "end_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."assessment_status"`);
    }

}
