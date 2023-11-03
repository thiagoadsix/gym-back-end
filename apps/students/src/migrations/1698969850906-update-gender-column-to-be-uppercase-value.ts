import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGenderColumnToBeUppercaseValue1698969850906 implements MigrationInterface {
    name = 'UpdateGenderColumnToBeUppercaseValue1698969850906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."gender_type" RENAME TO "gender_type_old"`);
        await queryRunner.query(`CREATE TYPE "public"."gender_type" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "gender" TYPE "public"."gender_type" USING "gender"::"text"::"public"."gender_type"`);
        await queryRunner.query(`DROP TYPE "public"."gender_type_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."gender_type_old" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "gender" TYPE "public"."gender_type_old" USING "gender"::"text"::"public"."gender_type_old"`);
        await queryRunner.query(`DROP TYPE "public"."gender_type"`);
        await queryRunner.query(`ALTER TYPE "public"."gender_type_old" RENAME TO "gender_type"`);
    }

}
