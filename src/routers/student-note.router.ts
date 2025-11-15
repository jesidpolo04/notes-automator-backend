import { Router } from "express";
import StudentNoteController from "@/controllers/student-note.controller";
import {
  createStudentNoteValidator,
  updateStudentNoteValidator,
  searchStudentNoteValidator,
} from "@/validators/student-note.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

const studentNoteRouter = Router();

studentNoteRouter.get("/", StudentNoteController.getAll);

studentNoteRouter.get("/search", searchStudentNoteValidator, handleValidationErrors, StudentNoteController.search);

studentNoteRouter.get("/:id", StudentNoteController.getById);

studentNoteRouter.post(
  "/",
  createStudentNoteValidator,
  handleValidationErrors,
  StudentNoteController.create
);

studentNoteRouter.put(
  "/:id",
  updateStudentNoteValidator,
  handleValidationErrors,
  StudentNoteController.update
);

studentNoteRouter.delete("/:id", StudentNoteController.delete);

export { studentNoteRouter };
