import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnTest1698861903469 implements MigrationInterface {
    name = 'RemoveColumnTest1698861903469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "test" integer NOT NULL`);
    }

}
