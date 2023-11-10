import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Base } from "./base";
import { Workout } from "./workout";

@Entity("exercises")
export class Exercise extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Workout, (workout) => workout.exercises)
  @JoinColumn({ name: "workout_id" })
  workout!: Workout;

  @Column({ name: "workout_id" })
  workoutId!: string;

  @Column("text")
  name!: string;

  @Column("int")
  sets!: number;

  @Column("int", { array: true })
  repetitions!: number[];

  @Column("text", { name: "video_link", nullable: true })
  videoLink?: string;

  @Column("text", { nullable: true })
  observation?: string;

  @Column("char", { length: 1 })
  type!: string;
}
