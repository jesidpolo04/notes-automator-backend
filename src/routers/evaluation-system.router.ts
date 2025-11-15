import { Router, Request, Response } from "express";
import { EvaluationSystemController } from "@/controllers/evaluation-system-controller";
import {
  createEvaluationSystemValidator,
  updateEvaluationSystemValidator,
} from "@/validators/evaluation-system.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

export const evaluationSystemRouter: Router = Router();

const evaluationSystemController = new EvaluationSystemController();

evaluationSystemRouter.post(
  "/",
  createEvaluationSystemValidator,
  handleValidationErrors,
  (req: Request, res: Response) => evaluationSystemController.create(req, res)
);

evaluationSystemRouter.get("/", (req: Request, res: Response) =>
  evaluationSystemController.getAll(req, res)
);

evaluationSystemRouter.get("/:id", (req: Request, res: Response) =>
  evaluationSystemController.getById(req, res)
);

evaluationSystemRouter.put(
  "/:id",
  updateEvaluationSystemValidator,
  handleValidationErrors,
  (req: Request, res: Response) => evaluationSystemController.update(req, res)
);

evaluationSystemRouter.delete("/:id", (req: Request, res: Response) =>
  evaluationSystemController.delete(req, res)
);
