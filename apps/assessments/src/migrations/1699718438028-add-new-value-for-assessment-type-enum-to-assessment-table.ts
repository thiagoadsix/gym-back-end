import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewValueForAssessmentTypeEnumToAssessmentTable1699718438028
  implements MigrationInterface
{
  name = "AddNewValueForAssessmentTypeEnumToAssessmentTable1699718438028";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ["VIEW", "assessments_view", "public"]
    );
    await queryRunner.query(`DROP VIEW IF EXISTS "assessments_view" CASCADE`);

    await queryRunner.query(
      `ALTER TYPE "public"."assessment_type" RENAME TO "assessment_type_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."assessment_type" AS ENUM('POLLOCK_3', 'POLLOCK_7')`
    );
    await queryRunner.query(
      `ALTER TABLE "assessments" ALTER COLUMN "assessment_type" TYPE "public"."assessment_type" USING "assessment_type"::"text"::"public"."assessment_type"`
    );
    await queryRunner.query(`DROP TYPE "public"."assessment_type_old"`);
    await queryRunner.query(
      `CREATE VIEW "assessments_view" AS SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", ' ', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object('assessmentId', "assessment"."id", 'assessmentType', "assessment"."assessment_type", 'assessmentData', "assessment"."assessment_data")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        "public",
        "VIEW",
        "assessments_view",
        'SELECT (SELECT u.id FROM users u WHERE u.id = "student"."user_id") as "user_id", "student"."id" as "student_id", CONCAT("student"."name", \' \', "student"."surname") as "student_full_name", "student"."city" as "student_city", "student"."state" as "student_state", "student"."age" as "student_age", "student"."height" as "student_height", "student"."gender" as "student_gender", json_agg(json_build_object(\'assessmentId\', "assessment"."id", \'assessmentType\', "assessment"."assessment_type", \'assessmentData\', "assessment"."assessment_data")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."assessment_type_old" AS ENUM('POLLOCK_3')`
    );
    await queryRunner.query(
      `ALTER TABLE "assessments" ALTER COLUMN "assessment_type" TYPE "public"."assessment_type_old" USING "assessment_type"::"text"::"public"."assessment_type_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."assessment_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."assessment_type_old" RENAME TO "assessment_type"`
    );
  }
}
