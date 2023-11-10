import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Base } from "./base";
import { Student } from "./student";
import { Assessment } from "./assessment";
import { Exercise } from "./exercise";

@Entity("workouts")
export class Workout extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Student, (student) => student.workouts)
  @JoinColumn({ name: "student_id" })
  student!: Student;

  @Column({ name: "student_id" })
  studentId!: string;

  @ManyToOne(() => Assessment, (assessment) => assessment.workouts)
  @JoinColumn({ name: "assessment_id" })
  assessment!: Assessment;

  @Column({ name: "assessment_id" })
  assessmentId!: string;

  @Column("text", { nullable: true })
  objective?: string;

  @Column("int", { nullable: true })
  phase?: number;

  @OneToMany(() => Exercise, (workoutExercise) => workoutExercise.workout)
  exercises!: Exercise[];
}
