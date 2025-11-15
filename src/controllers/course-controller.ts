import { AppDataSource } from "@/database/postgres.config";
import { Course } from "@/entities";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class CourseController {
  private readonly _courseRepository: Repository<Course>;

  constructor() {
    this._courseRepository = AppDataSource.getRepository(Course);
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { courseName, teacherId, scholarYearId } = request.body;

      const course = this._courseRepository.create({
        courseName,
        teacher: { id: teacherId },
        scholarYear: { id: scholarYearId },
      });

      const savedCourse = await this._courseRepository.save(course);
      response.status(201).json(savedCourse);
    } catch (error) {
      console.error("Error creating Course:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    try {
      const courses = await this._courseRepository.find({
        relations: ["teacher", "scholarYear"],
      });
      response.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching Courses:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const course = await this._courseRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["teacher", "scholarYear"],
      });

      if (!course) {
        response.status(404).json({ message: "Curso no encontrado" });
        return;
      }

      response.status(200).json(course);
    } catch (error) {
      console.error("Error fetching Course:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const course = await this._courseRepository.findOneBy({
        id: Number.parseInt(id),
      });

      if (!course) {
        response.status(404).json({ message: "Curso no encontrado" });
        return;
      }

      const { courseName, teacherId, scholarYearId } = request.body;

      await this._courseRepository.update(id, {
        courseName,
        teacher: teacherId ? { id: teacherId } : undefined,
        scholarYear: scholarYearId ? { year: scholarYearId } : undefined,
      });

      const updatedCourse = await this._courseRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["teacher", "scholarYear"],
      });
      response.status(200).json(updatedCourse);
    } catch (error) {
      console.error("Error updating Course:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const course = await this._courseRepository.findOneBy({
        id: Number.parseInt(id),
      });

      if (!course) {
        response.status(404).json({ message: "Curso no encontrado" });
        return;
      }

      await this._courseRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      console.error("Error deleting Course:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
