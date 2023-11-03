import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnumTypeForRoleColumnFromStudents1698969451458 implements MigrationInterface {
    name = 'AddEnumTypeForRoleColumnFromStudents1698969451458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."gender_type" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "students" ADD "gender" "public"."gender_type" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."gender_type"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "gender" character varying NOT NULL`);
    }

}
