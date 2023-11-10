import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationshipBetweenAssessmentsAndUser1699490499050 implements MigrationInterface {
    name = 'CreateRelationshipBetweenAssessmentsAndUser1699490499050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_fea6577dc5ea31653d99fe4b649" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_fea6577dc5ea31653d99fe4b649"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD "user_id" character varying NOT NULL`);
    }

}
