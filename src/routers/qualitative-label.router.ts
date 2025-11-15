import { Router } from "express";
import QualitativeLabelController from "@/controllers/qualitative-label.controller";
import {
  createQualitativeLabelValidator,
  updateQualitativeLabelValidator,
} from "@/validators/qualitative-label.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

const qualitativeLabelRouter = Router();

qualitativeLabelRouter.get("/", QualitativeLabelController.getAll);

qualitativeLabelRouter.get("/:id", QualitativeLabelController.getById);

qualitativeLabelRouter.post(
  "/",
  createQualitativeLabelValidator,
  handleValidationErrors,
  QualitativeLabelController.create
);

qualitativeLabelRouter.put(
  "/:id",
  updateQualitativeLabelValidator,
  handleValidationErrors,
  QualitativeLabelController.update
);

qualitativeLabelRouter.delete("/:id", QualitativeLabelController.delete);

export { qualitativeLabelRouter };
