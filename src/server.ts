import express from "express";
import cors from "cors";
import { appRouter } from "@/router";
import { logger } from "./logging";

export class Server {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(appRouter);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  }
}
