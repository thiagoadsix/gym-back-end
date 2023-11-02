import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnGenderToStudents1698893321727 implements MigrationInterface {
    name = 'AddColumnGenderToStudents1698893321727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "gender" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "gender"`);
    }

}
