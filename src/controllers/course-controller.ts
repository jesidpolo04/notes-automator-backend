import { AppDataSource } from "@/database/postgres.config";
import { Course } from "@/entities";
import { logger } from "@/logging";
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
      logger.error(error, "Error creating Course:");
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
      logger.error(error, "Error fetching Courses:");
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
      logger.error(error, "Error fetching Course:");
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
        scholarYear: scholarYearId ? { id: scholarYearId } : undefined,
      });

      const updatedCourse = await this._courseRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["teacher", "scholarYear"],
      });
      response.status(200).json(updatedCourse);
    } catch (error) {
      logger.error(error, "Error updating Course:");
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
      logger.error(error, "Error deleting Course:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async filter(request: Request, response: Response): Promise<void> {
    try {
      const { teacherId, scholarYearId } = request.query;
      const where: any = {};

      if (teacherId) {
        where.teacher = { id: Number.parseInt(teacherId as string) };
      }

      if (scholarYearId) {
        where.scholarYear = { id: Number.parseInt(scholarYearId as string) };
      }

      const courses = await this._courseRepository.find({
        where,
        relations: ["teacher", "scholarYear"],
      });

      response.status(200).json(courses);
    } catch (error) {
      logger.error(error, "Error filtering Courses:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
