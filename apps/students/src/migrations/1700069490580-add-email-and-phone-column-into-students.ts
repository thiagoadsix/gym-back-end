import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailAndPhoneColumnIntoStudents1700069490580 implements MigrationInterface {
    name = 'AddEmailAndPhoneColumnIntoStudents1700069490580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "email"`);
    }

}
