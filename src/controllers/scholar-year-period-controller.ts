import { AppDataSource } from "@/database/postgres.config";
import { ScholarYearPeriod } from "@/entities";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class ScholarYearPeriodController {
  private readonly _scholarYearPeriodRepository: Repository<ScholarYearPeriod>;

  constructor() {
    this._scholarYearPeriodRepository =
      AppDataSource.getRepository(ScholarYearPeriod);
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { description, scholarYearId } = request.body;

      const scholarYearPeriod = this._scholarYearPeriodRepository.create({
        description,
        scholarYear: { id: scholarYearId },
      });

      const savedScholarYearPeriod =
        await this._scholarYearPeriodRepository.save(scholarYearPeriod);
      response.status(201).json(savedScholarYearPeriod);
    } catch (error) {
      console.error("Error creating Scholar Year Period:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    try {
      const scholarYearPeriods = await this._scholarYearPeriodRepository.find({
        relations: ["scholarYear"],
      });
      response.status(200).json(scholarYearPeriods);
    } catch (error) {
      console.error("Error fetching Scholar Year Periods:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const scholarYearPeriod = await this._scholarYearPeriodRepository.findOne(
        {
          where: { id: Number.parseInt(id) },
          relations: ["scholarYear"],
        }
      );

      if (!scholarYearPeriod) {
        response
          .status(404)
          .json({ message: "Período del año escolar no encontrado" });
        return;
      }

      response.status(200).json(scholarYearPeriod);
    } catch (error) {
      console.error("Error fetching Scholar Year Period:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const scholarYearPeriod =
        await this._scholarYearPeriodRepository.findOneBy({
          id: Number.parseInt(id),
        });

      if (!scholarYearPeriod) {
        response
          .status(404)
          .json({ message: "Período del año escolar no encontrado" });
        return;
      }

      const { description, scholarYearId } = request.body;

      await this._scholarYearPeriodRepository.update(id, {
        description,
        scholarYear: scholarYearId ? { year: scholarYearId } : undefined,
      });

      const updatedScholarYearPeriod =
        await this._scholarYearPeriodRepository.findOne({
          where: { id: Number.parseInt(id) },
          relations: ["scholarYear"],
        });
      response.status(200).json(updatedScholarYearPeriod);
    } catch (error) {
      console.error("Error updating Scholar Year Period:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const scholarYearPeriod =
        await this._scholarYearPeriodRepository.findOneBy({
          id: Number.parseInt(id),
        });

      if (!scholarYearPeriod) {
        response
          .status(404)
          .json({ message: "Período del año escolar no encontrado" });
        return;
      }

      await this._scholarYearPeriodRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      console.error("Error deleting Scholar Year Period:", error);
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
