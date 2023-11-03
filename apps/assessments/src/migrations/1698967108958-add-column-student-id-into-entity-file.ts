import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnStudentIdIntoEntityFile1698967108958 implements MigrationInterface {
    name = 'AddColumnStudentIdIntoEntityFile1698967108958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_060c5cb0c29c986eabfd77c52d3"`);
        await queryRunner.query(`ALTER TABLE "assessments" ALTER COLUMN "student_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_060c5cb0c29c986eabfd77c52d3" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_060c5cb0c29c986eabfd77c52d3"`);
        await queryRunner.query(`ALTER TABLE "assessments" ALTER COLUMN "student_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_060c5cb0c29c986eabfd77c52d3" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
