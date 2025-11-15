import { Router, Request, Response } from "express";
import { ScholarYearPeriodController } from "@/controllers/scholar-year-period-controller";
import {
  createScholarYearPeriodValidator,
  updateScholarYearPeriodValidator,
} from "@/validators/scholar-year-period.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

export const scholarYearPeriodRouter: Router = Router();

const scholarYearPeriodController = new ScholarYearPeriodController();

scholarYearPeriodRouter.post(
  "/",
  createScholarYearPeriodValidator,
  handleValidationErrors,
  (req: Request, res: Response) => scholarYearPeriodController.create(req, res)
);

scholarYearPeriodRouter.get("/", (req: Request, res: Response) =>
  scholarYearPeriodController.getAll(req, res)
);

scholarYearPeriodRouter.get("/:id", (req: Request, res: Response) =>
  scholarYearPeriodController.getById(req, res)
);

scholarYearPeriodRouter.put(
  "/:id",
  updateScholarYearPeriodValidator,
  handleValidationErrors,
  (req: Request, res: Response) => scholarYearPeriodController.update(req, res)
);

scholarYearPeriodRouter.delete("/:id", (req: Request, res: Response) =>
  scholarYearPeriodController.delete(req, res)
);
