import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { Base } from "./base";
import { Student } from "./student";
import { Workout } from "./workout";
import { User } from "./user";

export enum AssessmentType {
  POLLOCK_3 = "POLLOCK_3",
}

export enum AssessmentStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@Entity("assessments")
export class Assessment extends Base {
  @ManyToOne(() => Student, (student) => student.assessments)
  @JoinColumn({ name: "student_id" })
  student!: Student;

  @Column({ name: "student_id" })
  studentId!: string;

  @ManyToOne(() => User, (user) => user.assessments)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "user_id" })
  userId!: string;

  @Column({
    type: "enum",
    enum: AssessmentType,
    name: "assessment_type",
    enumName: "assessment_type",
  })
  assessmentType!: AssessmentType;

  @Column({ name: "assessment_data", type: "jsonb", nullable: true })
  assessmentData: any;

  @OneToMany(() => Workout, (workout) => workout.assessment)
  workouts!: Workout[];

  @Column({
    type: "enum",
    enum: AssessmentStatus,
    default: AssessmentStatus.IN_PROGRESS,
    enumName: "assessment_status",
  })
  status!: AssessmentStatus;

  @Column("varchar", { name: "start_date", nullable: true })
  startDate?: string;

  @Column("varchar", { name: "end_date", nullable: true })
  endDate?: string;

  @Column("varchar")
  name!: string;
}
