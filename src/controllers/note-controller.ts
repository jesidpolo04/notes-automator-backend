import { AppDataSource } from "@/database/postgres.config";
import { Note } from "@/entities";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class NoteController {
  private readonly _noteRepository: Repository<Note>;

  constructor() {
    this._noteRepository = AppDataSource.getRepository(Note);
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { description, courseId, scholarYearPeriodId, weight } =
        request.body;

      const note = this._noteRepository.create({
        description,
        course: { id: courseId },
        scholarYearPeriod: { id: scholarYearPeriodId },
        weight,
      });

      const savedNote = await this._noteRepository.save(note);
      response.status(201).json(savedNote);
    } catch (error) {
      console.error("Error creating Note:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    try {
      const notes = await this._noteRepository.find({
        relations: ["course", "scholarYearPeriod"],
      });
      response.status(200).json(notes);
    } catch (error) {
      console.error("Error fetching Notes:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const note = await this._noteRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["course", "scholarYearPeriod"],
      });

      if (!note) {
        response.status(404).json({ message: "Nota no encontrada" });
        return;
      }

      response.status(200).json(note);
    } catch (error) {
      console.error("Error fetching Note:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const note = await this._noteRepository.findOneBy({
        id: Number.parseInt(id),
      });

      if (!note) {
        response.status(404).json({ message: "Nota no encontrada" });
        return;
      }

      const { description, courseId, scholarYearPeriodId, weight } =
        request.body;

      await this._noteRepository.update(id, {
        description,
        course: courseId ? { id: courseId } : undefined,
        scholarYearPeriod: scholarYearPeriodId
          ? { id: scholarYearPeriodId }
          : undefined,
        weight,
      });

      const updatedNote = await this._noteRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["course", "scholarYearPeriod"],
      });
      response.status(200).json(updatedNote);
    } catch (error) {
      console.error("Error updating Note:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const note = await this._noteRepository.findOneBy({
        id: Number.parseInt(id),
      });

      if (!note) {
        response.status(404).json({ message: "Nota no encontrada" });
        return;
      }

      await this._noteRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      console.error("Error deleting Note:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
