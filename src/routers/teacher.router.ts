import { Router, Request, Response } from "express";
import { TeacherController } from "@/controllers/teacher-controller";
import {
  createTeacherValidator,
  updateTeacherValidator,
} from "@/validators/teacher.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

export const teacherRouter: Router = Router();

const teacherController = new TeacherController();

teacherRouter.post(
  "/",
  createTeacherValidator,
  handleValidationErrors,
  (req: Request, res: Response) => teacherController.create(req, res)
);

teacherRouter.get("/", (req: Request, res: Response) =>
  teacherController.getAll(req, res)
);

teacherRouter.get("/:id", (req: Request, res: Response) =>
  teacherController.getById(req, res)
);

teacherRouter.put(
  "/:id",
  updateTeacherValidator,
  handleValidationErrors,
  (req: Request, res: Response) => teacherController.update(req, res)
);

teacherRouter.delete("/:id", (req: Request, res: Response) =>
  teacherController.delete(req, res)
);
