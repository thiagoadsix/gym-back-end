require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "config";
import { User, Student, Assessment, AssessmentsView } from "database";

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
  entities: [User, Student, Assessment, AssessmentsView],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  subscribers: ["src/subscribers/**/*{.ts,.js}"],
});
