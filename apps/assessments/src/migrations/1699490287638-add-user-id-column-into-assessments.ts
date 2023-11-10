import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdColumnIntoAssessments1699490287638 implements MigrationInterface {
    name = 'AddUserIdColumnIntoAssessments1699490287638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" ADD "user_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "user_id"`);
    }

}
