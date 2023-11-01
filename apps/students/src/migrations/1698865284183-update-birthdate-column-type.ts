import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBirthdateColumnType1698865284183 implements MigrationInterface {
    name = 'UpdateBirthdateColumnType1698865284183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "birthDate" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "birthDate" TIMESTAMP NOT NULL`);
    }

}
