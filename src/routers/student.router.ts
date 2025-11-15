import { Router } from "express";
import StudentController from "@/controllers/student.controller";
import {
  createStudentValidator,
  updateStudentValidator,
} from "@/validators/student.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

const studentRouter = Router();

// GET /api/students - Get all students
studentRouter.get("/", StudentController.getAll);

// GET /api/students/:id - Get student by ID
studentRouter.get("/:id", StudentController.getById);

// POST /api/students - Create new student
studentRouter.post(
  "/",
  createStudentValidator,
  handleValidationErrors,
  StudentController.create
);

// PUT /api/students/:id - Update student
studentRouter.put(
  "/:id",
  updateStudentValidator,
  handleValidationErrors,
  StudentController.update
);

// DELETE /api/students/:id - Delete student
studentRouter.delete("/:id", StudentController.delete);

export { studentRouter };
