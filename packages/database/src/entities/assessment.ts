import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { Base } from "./base";
import { Student } from "./student";

export enum AssessmentType {
  POLLOCK_3 = "POLLOCK_3",
}

@Entity("assessments")
export class Assessment extends Base {
  @ManyToOne(() => Student, (student) => student.assessments)
  @JoinColumn({ name: "student_id" })
  student!: Student;

  @Column({ name: "student_id" })
  studentId!: string;

  @Column({
    type: "enum",
    enum: AssessmentType,
    name: "assessment_type",
    enumName: "assessment_type",
  })
  assessmentType!: AssessmentType;

  @Column({ name: "assessment_data", type: "jsonb", nullable: true })
  assessmentData: any;

  @CreateDateColumn({ name: "assessed_at" })
  assessedAt!: Date;
}
