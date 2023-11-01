import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";

import Base from "./base";
import { User } from "./user";

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

  @Column("double precision")
  weight!: number;

  @Column("double precision")
  height!: number;

  @Column()
  birthDate!: string;

  @Column()
  age!: number;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "user_id" })
  userId!: string;

  toJSON() {
    return { ...this };
  }
}
