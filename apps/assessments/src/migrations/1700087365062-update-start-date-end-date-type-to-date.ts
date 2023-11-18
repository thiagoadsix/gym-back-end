import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStartDateEndDateTypeToDate1700087365062
  implements MigrationInterface
{
  name = "UpdateStartDateEndDateTypeToDate1700087365062";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "assessments_view", "public"]
    );
    await queryRunner.query(`DROP VIEW "assessments_view"`);

    await queryRunner.query(
      `ALTER TABLE "assessments" DROP COLUMN "start_date"`
    );
    await queryRunner.query(`ALTER TABLE "assessments" ADD "start_date" date`);
    await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "assessments" ADD "end_date" date`);

    await queryRunner.query(
      `CREATE VIEW "assessments_view" AS SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", ' ', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object('assessmentId', "assessment"."id", 'assessmentType', "assessment"."assessment_type", 'assessmentData', "assessment"."assessment_data", 'startDate', "assessment"."start_date", 'endDate', "assessment"."end_date", 'status', "assessment"."status")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "assessments_view",
        'SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", \' \', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object(\'assessmentId\', "assessment"."id", \'assessmentType\', "assessment"."assessment_type", \'assessmentData\', "assessment"."assessment_data", \'startDate\', "assessment"."start_date", \'endDate\', "assessment"."end_date", \'status\', "assessment"."status")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "end_date"`);
    await queryRunner.query(
      `ALTER TABLE "assessments" ADD "end_date" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "assessments" DROP COLUMN "start_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "assessments" ADD "start_date" character varying`
    );
  }
}
