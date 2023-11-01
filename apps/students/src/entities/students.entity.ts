import { Entity, Column } from "typeorm";

import Base from "./base.entity";

@Entity("students")
export class Students extends Base {
  @Column({ name: "user_id" })
  userId!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  weight!: number;

  @Column()
  height!: number;

  @Column()
  birthDate!: Date;

  @Column()
  age!: number;

  toJSON() {
    return { ...this };
  }
}
