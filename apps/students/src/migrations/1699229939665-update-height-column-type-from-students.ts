import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHeightColumnTypeFromStudents1699229939665
  implements MigrationInterface
{
  name = "UpdateHeightColumnTypeFromStudents1699229939665";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "assessments_view", "public"]
    );
    await queryRunner.query(`DROP VIEW IF EXISTS "assessments_view" CASCADE`);

    await queryRunner.query(
      `ALTER TABLE "students" ALTER COLUMN "height" TYPE numeric(5,2) USING "height"::numeric(5,2)`
    );

    await queryRunner.query(
      `CREATE VIEW "assessments_view" AS SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", ' ', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object('assessmentId', "assessment"."id", 'assessmentType', "assessment"."assessment_type", 'assessmentData', "assessment"."assessment_data", 'assessedAt', "assessment"."assessed_at")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "assessments_view",
        'SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", \' \', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object(\'assessmentId\', "assessment"."id", \'assessmentType\', "assessment"."assessment_type", \'assessmentData\', "assessment"."assessment_data", \'assessedAt\', "assessment"."assessed_at")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "assessments_view", "public"]
    );
    await queryRunner.query(`DROP VIEW IF EXISTS "assessments_view" CASCADE`);

    await queryRunner.query(
      `ALTER TABLE "students" ALTER COLUMN "height" TYPE double precision USING "height"::double precision`
    );

    await queryRunner.query(
      `CREATE VIEW "assessments_view" AS SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", ' ', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object('assessmentId', "assessment"."id", 'assessmentType', "assessment"."assessment_type", 'assessmentData', "assessment"."assessment_data", 'assessedAt', "assessment"."assessed_at")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "assessments_view",
        'SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", \' \', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object(\'assessmentId\', "assessment"."id", \'assessmentType\', "assessment"."assessment_type", \'assessmentData\', "assessment"."assessment_data", \'assessedAt\', "assessment"."assessed_at")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"',
      ]
    );
  }
}
