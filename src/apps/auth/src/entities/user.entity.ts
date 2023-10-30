import { Entity, Column, Index } from "typeorm";
import Base from "./base.entity";

export enum RoleEnumType {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users")
export class User extends Base {
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
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role!: RoleEnumType.USER;

  @Column({
    default: false,
  })
  verified!: boolean;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
