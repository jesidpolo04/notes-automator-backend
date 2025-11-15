import { Router, Request, Response } from "express";
import { CourseController } from "@/controllers/course-controller";
import {
  createCourseValidator,
  updateCourseValidator,
} from "@/validators/course.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

export const courseRouter: Router = Router();

const courseController = new CourseController();

courseRouter.post(
  "/",
  createCourseValidator,
  handleValidationErrors,
  (req: Request, res: Response) => courseController.create(req, res)
);

courseRouter.get("/", (req: Request, res: Response) =>
  courseController.getAll(req, res)
);

courseRouter.get("/filter", (req: Request, res: Response) =>
  courseController.filter(req, res)
);

courseRouter.get("/:id", (req: Request, res: Response) =>
  courseController.getById(req, res)
);

courseRouter.put(
  "/:id",
  updateCourseValidator,
  handleValidationErrors,
  (req: Request, res: Response) => courseController.update(req, res)
);

courseRouter.delete("/:id", (req: Request, res: Response) =>
  courseController.delete(req, res)
);
