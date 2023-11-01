import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnTest1698861820112 implements MigrationInterface {
    name = 'AddNewColumnTest1698861820112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "test" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "test"`);
    }

}
