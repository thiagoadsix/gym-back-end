import bcrypt from "bcryptjs";
import { Entity, Column, Index, BeforeInsert, OneToMany } from "typeorm";

import { Base } from "./base";
import { Student } from "./student";

export enum RoleType {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users")
export class User extends Base {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: RoleType,
    enumName: "role_type",
    default: RoleType.USER,
  })
  role!: RoleType.USER;

  @Column({
    default: false,
  })
  verified!: boolean;

  @OneToMany(() => Student, (student) => student.user)
  students!: Student[];

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
