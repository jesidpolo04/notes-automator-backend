import { AppDataSource } from "@/database/postgres.config";
import { Teacher } from "@/entities";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { nanoid } from "nanoid";
import { logger } from "@/logging";
export class TeacherController {
  private readonly _teacherRepository: Repository<Teacher>;

  constructor() {
    this._teacherRepository = AppDataSource.getRepository(Teacher);
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { firstName, lastName, secondLastName, email, password } =
        request.body;

      const teacher = this._teacherRepository.create({
        id: nanoid(7),
        firstName,
        lastName,
        secondLastName,
        email,
        password,
      });

      const savedTeacher = await this._teacherRepository.save(teacher);
      response.status(201).json(savedTeacher);
    } catch (error) {
      logger.error("Error creating Teacher:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    try {
      const teachers = await this._teacherRepository.find();
      response.status(200).json(teachers);
    } catch (error) {
      logger.error("Error fetching Teachers:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const teacher = await this._teacherRepository.findOneBy({ id });

      if (!teacher) {
        response.status(404).json({ message: "Profesor no encontrado" });
        return;
      }

      response.status(200).json(teacher);
    } catch (error) {
      logger.error(error, "Error fetching Teacher:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const teacher = await this._teacherRepository.findOneBy({ id });

      if (!teacher) {
        response.status(404).json({ message: "Profesor no encontrado" });
        return;
      }

      const { firstName, lastName, secondLastName, email, password } =
        request.body;

      await this._teacherRepository.update(id, {
        firstName,
        lastName,
        secondLastName,
        email,
        password,
      });

      const updatedTeacher = await this._teacherRepository.findOneBy({ id });
      response.status(200).json(updatedTeacher);
    } catch (error) {
      logger.error(error, "Error updating Teacher:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const teacher = await this._teacherRepository.findOneBy({ id });

      if (!teacher) {
        response.status(404).json({ message: "Profesor no encontrado" });
        return;
      }

      await this._teacherRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      logger.error(error, "Error deleting Teacher:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
