import express from "express";

export class Server {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
