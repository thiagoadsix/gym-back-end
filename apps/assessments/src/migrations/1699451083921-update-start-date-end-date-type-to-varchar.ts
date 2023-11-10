import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStartDateEndDateTypeToVarchar1699451083921 implements MigrationInterface {
    name = 'UpdateStartDateEndDateTypeToVarchar1699451083921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "start_date" character varying`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "end_date" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "end_date" date`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "start_date" date`);
    }

}
