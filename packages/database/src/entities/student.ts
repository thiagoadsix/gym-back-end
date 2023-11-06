import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./base";
import { User } from "./user";
import { Assessment } from "./assessment";

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

@Entity("students")
export class Student extends Base {
  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column("numeric", { precision: 5, scale: 2 })
  height!: number;

  @Column()
  birthDate!: string;

  @Column()
  age!: number;

  @Column({
    type: "enum",
    enum: GenderType,
    enumName: "gender_type",
  })
  gender!: GenderType;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "user_id" })
  userId!: string;

  @OneToMany(() => Student, (student) => student.user)
  assessments!: Assessment[];

  toJSON() {
    return { ...this };
  }
}
