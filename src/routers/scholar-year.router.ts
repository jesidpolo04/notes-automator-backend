import { ScholarYearController } from "@/controllers/scholar-year-controller";
import { scholarYearValidator } from "@/validators/scholar-year.validator";
import { Request, Response, Router } from "express";

export const scholarYearRouter: Router = Router();

const scholarYearController = new ScholarYearController();

scholarYearRouter.get("/", (req: Request, res: Response) =>
  scholarYearController.getAll(req, res)
);

scholarYearRouter.post(
  "/",
  scholarYearValidator,
  (req: Request, res: Response) => scholarYearController.create(req, res)
);

scholarYearRouter.delete("/:id", (req: Request, res: Response) =>
  scholarYearController.delete(req, res)
);
