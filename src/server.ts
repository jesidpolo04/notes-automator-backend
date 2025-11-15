import express from "express";
import { appRouter } from "@/router";

export class Server {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(appRouter);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
