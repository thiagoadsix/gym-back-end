import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAssessmentsView1699021252582 implements MigrationInterface {
    name = 'CreateAssessmentsView1699021252582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "assessments_view" AS SELECT "student"."id" as "studentId", CONCAT("student"."name", ' ', "student"."surname") as "studentFullName", "student"."city" as "studentCity", "student"."state" as "studentState", "student"."age" as "studentAge", "student"."height" as "studentHeight", "student"."gender" as "studentGender", json_agg(json_build_object('assessmentId', "assessment"."id", 'assessmentType', "assessment"."assessment_type", 'assessmentData', "assessment"."assessment_data", 'assessedAt', "assessment"."assessed_at")) as "assessments" FROM "assessments" "assessment" INNER JOIN "students" "student" ON  "student"."id" = "assessment"."student_id" AND "student"."deleted_at" IS NULL  INNER JOIN "users" "user" ON  "user"."id" = "student"."user_id" AND "user"."deleted_at" IS NULL WHERE "assessment"."deleted_at" IS NULL GROUP BY "student"."id"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","assessments_view","SELECT \"student\".\"id\" as \"studentId\", CONCAT(\"student\".\"name\", ' ', \"student\".\"surname\") as \"studentFullName\", \"student\".\"city\" as \"studentCity\", \"student\".\"state\" as \"studentState\", \"student\".\"age\" as \"studentAge\", \"student\".\"height\" as \"studentHeight\", \"student\".\"gender\" as \"studentGender\", json_agg(json_build_object('assessmentId', \"assessment\".\"id\", 'assessmentType', \"assessment\".\"assessment_type\", 'assessmentData', \"assessment\".\"assessment_data\", 'assessedAt', \"assessment\".\"assessed_at\")) as \"assessments\" FROM \"assessments\" \"assessment\" INNER JOIN \"students\" \"student\" ON  \"student\".\"id\" = \"assessment\".\"student_id\" AND \"student\".\"deleted_at\" IS NULL  INNER JOIN \"users\" \"user\" ON  \"user\".\"id\" = \"student\".\"user_id\" AND \"user\".\"deleted_at\" IS NULL WHERE \"assessment\".\"deleted_at\" IS NULL GROUP BY \"student\".\"id\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","assessments_view","public"]);
        await queryRunner.query(`DROP VIEW "assessments_view"`);
    }

}
