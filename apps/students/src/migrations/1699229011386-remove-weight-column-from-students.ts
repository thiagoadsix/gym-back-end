import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWeightColumnFromStudents1699229011386 implements MigrationInterface {
    name = 'RemoveWeightColumnFromStudents1699229011386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "weight"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "weight" double precision NOT NULL`);
    }

}
