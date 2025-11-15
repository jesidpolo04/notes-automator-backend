import { Router, Request, Response } from "express";
import { NoteController } from "@/controllers/note-controller";
import {
  createNoteValidator,
  updateNoteValidator,
} from "@/validators/note.validator";
import { handleValidationErrors } from "@/middlewares/validation.middleware";

export const noteRouter: Router = Router();

const noteController = new NoteController();

noteRouter.post(
  "/",
  createNoteValidator,
  handleValidationErrors,
  (req: Request, res: Response) => noteController.create(req, res)
);

noteRouter.get("/", (req: Request, res: Response) =>
  noteController.getAll(req, res)
);

noteRouter.get("/filter", (req: Request, res: Response) =>
  noteController.filter(req, res)
);

noteRouter.get("/:id", (req: Request, res: Response) =>
  noteController.getById(req, res)
);

noteRouter.put(
  "/:id",
  updateNoteValidator,
  handleValidationErrors,
  (req: Request, res: Response) => noteController.update(req, res)
);

noteRouter.delete("/:id", (req: Request, res: Response) =>
  noteController.delete(req, res)
);
