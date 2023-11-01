import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHeightWheightColumnsTypes1698862632810 implements MigrationInterface {
    name = 'UpdateHeightWheightColumnsTypes1698862632810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "weight" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "height" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "weight" integer NOT NULL`);
    }

}
