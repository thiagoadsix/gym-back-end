import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameColumnIntoAssessments1699490034187 implements MigrationInterface {
    name = 'AddNameColumnIntoAssessments1699490034187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "name"`);
    }

}
