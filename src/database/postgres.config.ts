import { DataSource } from "typeorm";
import { envs } from "@/envs";
import {
  Teacher,
  ScholarYear,
  ScholarYearPeriod,
  Course,
  Student,
  EvaluationSystem,
  QualitativeLabel,
  Note,
} from "@/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Teacher,
    ScholarYear,
    ScholarYearPeriod,
    Course,
    Student,
    EvaluationSystem,
    QualitativeLabel,
    Note,
  ],
  subscribers: [],
  migrations: [],
  poolSize: envs.POOL_MAX_CONNECTIONS,
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};
