import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveStartDateAndEndDateFromWorkoutTable1699467395309 implements MigrationInterface {
    name = 'RemoveStartDateAndEndDateFromWorkoutTable1699467395309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "end_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "start_date" date NOT NULL`);
    }

}
