import { ViewEntity, BaseEntity, Column, DataSource } from "typeorm";

import { AssessmentStatus, AssessmentType } from "../entities/assessment";

@ViewEntity({
  expression: (dataSource: DataSource) => {
    const query = dataSource
      .createQueryBuilder()
      .select([
        '(SELECT u.id FROM users u WHERE u.id = student.user_id) as "user_id"',
        'student.id as "student_id"',
        "CONCAT(student.name, ' ', student.surname) as \"student_full_name\"",
        'student.city as "student_city"',
        'student.state as "student_state"',
        'student.age as "student_age"',
        'student.height as "student_height"',
        'student.gender as "student_gender"',
        "json_agg(json_build_object('assessmentId', assessment.id, 'assessmentType', assessment.assessment_type, 'assessmentData', assessment.assessment_data, 'startDate', assessment.start_date, 'endDate', assessment.endDate, 'status', assessment.status)) as \"assessments\"",
      ])
      .from("assessments", "assessment")
      .innerJoin("students", "student", "student.id = assessment.student_id")
      .innerJoin("users", "user", "user.id = student.user_id")
      .groupBy("student.id");

    return query;
  },
})
export class AssessmentsView extends BaseEntity {
  @Column({ name: "user_id" })
  userId!: string;

  @Column({ name: "student_id" })
  studentId!: string;

  @Column({ name: "student_full_name" })
  studentFullName!: string;

  @Column({ name: "student_city" })
  studentCity!: string;

  @Column({ name: "student_state" })
  studentState!: string;

  @Column({ name: "student_age" })
  studentAge!: number;

  @Column("numeric", { precision: 5, scale: 2, name: "student_height" })
  studentHeight!: number;

  @Column({ name: "student_gender" })
  studentGender!: string;

  @Column("json")
  assessments!: Array<{
    assessmentId: string;
    assessmentType: AssessmentType;
    assessmentData: any;
    startDate: Date;
    endDate: Date;
    status: AssessmentStatus;
  }>;
}
