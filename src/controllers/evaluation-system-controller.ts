import { AppDataSource } from "@/database/postgres.config";
import { EvaluationSystem } from "@/entities";
import { logger } from "@/logging";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class EvaluationSystemController {
  private readonly _evaluationSystemRepository: Repository<EvaluationSystem>;

  constructor() {
    this._evaluationSystemRepository =
      AppDataSource.getRepository(EvaluationSystem);
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const { systemName, qualitative, minValue, maxValue } = request.body;

      const evaluationSystem = this._evaluationSystemRepository.create({
        systemName,
        qualitative,
        minValue,
        maxValue,
      });

      const savedEvaluationSystem = await this._evaluationSystemRepository.save(
        evaluationSystem
      );
      response.status(201).json(savedEvaluationSystem);
    } catch (error) {
      logger.error(error, "Error creating Evaluation System:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(_: Request, response: Response): Promise<void> {
    try {
      const evaluationSystems = await this._evaluationSystemRepository.find();
      response.status(200).json(evaluationSystems);
    } catch (error) {
      logger.error(error, "Error fetching Evaluation Systems:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const evaluationSystem = await this._evaluationSystemRepository.findOneBy(
        { id: Number.parseInt(id) }
      );

      if (!evaluationSystem) {
        response
          .status(404)
          .json({ message: "Sistema de evaluación no encontrado" });
        return;
      }

      response.status(200).json(evaluationSystem);
    } catch (error) {
      logger.error(error, "Error fetching Evaluation System:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const evaluationSystem = await this._evaluationSystemRepository.findOneBy(
        { id: Number.parseInt(id) }
      );

      if (!evaluationSystem) {
        response
          .status(404)
          .json({ message: "Sistema de evaluación no encontrado" });
        return;
      }

      const { systemName, qualitative, minValue, maxValue } = request.body;

      await this._evaluationSystemRepository.update(id, {
        systemName,
        qualitative,
        minValue,
        maxValue,
      });

      const updatedEvaluationSystem =
        await this._evaluationSystemRepository.findOneBy({
          id: Number.parseInt(id),
        });
      response.status(200).json(updatedEvaluationSystem);
    } catch (error) {
      logger.error(error, "Error updating Evaluation System:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const evaluationSystem = await this._evaluationSystemRepository.findOneBy(
        { id: Number.parseInt(id) }
      );

      if (!evaluationSystem) {
        response
          .status(404)
          .json({ message: "Sistema de evaluación no encontrado" });
        return;
      }

      await this._evaluationSystemRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      logger.error(error, "Error deleting Evaluation System:");
      response.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
