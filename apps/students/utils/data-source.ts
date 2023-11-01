require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "config";
import { Student, User } from "database";

const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>("postgresConfig");

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: [Student, User],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  subscribers: ["src/subscribers/**/*{.ts,.js}"],
});
