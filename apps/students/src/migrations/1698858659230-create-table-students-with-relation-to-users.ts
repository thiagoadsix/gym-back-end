import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableStudentsWithRelationToUsers1698858659230 implements MigrationInterface {
    name = 'CreateTableStudentsWithRelationToUsers1698858659230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "birthDate" TIMESTAMP NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
