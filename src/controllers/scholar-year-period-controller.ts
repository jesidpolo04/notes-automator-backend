import { AppDataSource } from "@/database/postgres.config";
import { ScholarYearPeriod } from "@/entities";
import { logger } from "@/logging";
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
      logger.error(error, "Error creating Scholar Year Period:");
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
      logger.error(error, "Error fetching Scholar Year Periods:");
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
      logger.error(error, "Error fetching Scholar Year Period:");
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
      logger.error(error, "Error updating Scholar Year Period:");
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
      logger.error(error, "Error deleting Scholar Year Period:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async filter(request: Request, response: Response): Promise<void> {
    try {
      const { scholarYearId } = request.query;
      const where: any = {};

      if (scholarYearId) {
        where.scholarYear = { id: Number.parseInt(scholarYearId as string) };
      }

      const scholarYearPeriods = await this._scholarYearPeriodRepository.find({
        where,
        relations: ["scholarYear"],
      });

      response.status(200).json(scholarYearPeriods);
    } catch (error) {
      logger.error(error, "Error filtering Scholar Year Periods:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
