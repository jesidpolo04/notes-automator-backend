import { AppDataSource } from "@/database/postgres.config";
import { ScholarYear } from "@/entities";
import { logger } from "@/logging";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class ScholarYearController {
  private readonly _scholarYearRepository: Repository<ScholarYear>;
  constructor() {
    this._scholarYearRepository = AppDataSource.getRepository(ScholarYear);
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      //Validate with scholarYearValidator
      const { year, description, evaluationSystemId } = request.body;

      const scholarYear = this._scholarYearRepository.create({
        year,
        description,
        evaluationSystem: { id: evaluationSystemId },
      });

      const savedScholarYear = await this._scholarYearRepository.save(
        scholarYear
      );
      response.status(201).json(savedScholarYear);
    } catch (error) {
      logger.error(error, "Error creating Scholar Year:");
      response.status(500).json({ message: "Internal server error" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    try {
      const scholarYears = await this._scholarYearRepository.find();
      response.status(200).json(scholarYears);
    } catch (error) {
      logger.error(error, "Error fetching Scholar Years:");
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
