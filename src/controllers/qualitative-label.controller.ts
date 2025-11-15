import { Request, Response } from "express";
import { AppDataSource } from "@/database/postgres.config";
import { QualitativeLabel } from "@/entities/qualitative-label/qualitative-label";
import { EvaluationSystem } from "@/entities/evaluation-system/evaluation-system";

class QualitativeLabelController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const qualitativeLabelRepository =
        AppDataSource.getRepository(QualitativeLabel);
      const qualitativeLabels = await qualitativeLabelRepository.find({
        relations: ["evaluationSystem"],
      });

      return res.json({
        success: true,
        data: qualitativeLabels,
        count: qualitativeLabels.length,
      });
    } catch (error) {
      console.error("Error fetching qualitative labels:", error);
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al obtener las etiquetas cualitativas",
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const qualitativeLabelRepository =
        AppDataSource.getRepository(QualitativeLabel);

      const qualitativeLabel = await qualitativeLabelRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["evaluationSystem"],
      });

      if (!qualitativeLabel) {
        return res.status(404).json({
          success: false,
          message: "Etiqueta cualitativa no encontrada",
        });
      }

      return res.json({
        success: true,
        data: qualitativeLabel,
      });
    } catch (error) {
      console.error("Error fetching qualitative label:", error);
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al obtener la etiqueta cualitativa",
      });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { label, evaluationSystemId } = req.body;

      const evaluationSystemRepository =
        AppDataSource.getRepository(EvaluationSystem);
      const evaluationSystem = await evaluationSystemRepository.findOne({
        where: { id: evaluationSystemId },
      });

      if (!evaluationSystem) {
        return res.status(404).json({
          success: false,
          message: "Sistema de evaluación no encontrado",
        });
      }

      const qualitativeLabelRepository =
        AppDataSource.getRepository(QualitativeLabel);
      const qualitativeLabel = qualitativeLabelRepository.create({
        label,
        evaluationSystem,
      });

      const savedQualitativeLabel = await qualitativeLabelRepository.save(
        qualitativeLabel
      );

      const completeQualitativeLabel = await qualitativeLabelRepository.findOne(
        {
          where: { id: savedQualitativeLabel.id },
          relations: ["evaluationSystem"],
        }
      );

      return res.status(201).json({
        success: true,
        message: "Etiqueta cualitativa creada exitosamente",
        data: completeQualitativeLabel,
      });
    } catch (error) {
      console.error("Error creating qualitative label:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear la etiqueta cualitativa",
      });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { evaluationSystemId, ...updateData } = req.body;

      const qualitativeLabelRepository =
        AppDataSource.getRepository(QualitativeLabel);
      const qualitativeLabel = await qualitativeLabelRepository.findOne({
        where: { id: Number.parseInt(id) },
      });

      if (!qualitativeLabel) {
        return res.status(404).json({
          success: false,
          message: "Etiqueta cualitativa no encontrada",
        });
      }

      if (evaluationSystemId) {
        const evaluationSystemRepository =
          AppDataSource.getRepository(EvaluationSystem);
        const evaluationSystem = await evaluationSystemRepository.findOne({
          where: { id: evaluationSystemId },
        });

        if (!evaluationSystem) {
          return res.status(404).json({
            success: false,
            message: "Sistema de evaluación no encontrado",
          });
        }

        updateData.evaluationSystem = evaluationSystem;
      }

      await qualitativeLabelRepository.update(Number.parseInt(id), updateData);

      const updatedQualitativeLabel = await qualitativeLabelRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["evaluationSystem"],
      });

      return res.json({
        success: true,
        message: "Etiqueta cualitativa actualizada exitosamente",
        data: updatedQualitativeLabel,
      });
    } catch (error) {
      console.error("Error updating qualitative label:", error);
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al actualizar la etiqueta cualitativa",
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const qualitativeLabelRepository =
        AppDataSource.getRepository(QualitativeLabel);

      const qualitativeLabel = await qualitativeLabelRepository.findOne({
        where: { id: Number.parseInt(id) },
      });

      if (!qualitativeLabel) {
        return res.status(404).json({
          success: false,
          message: "Etiqueta cualitativa no encontrada",
        });
      }

      await qualitativeLabelRepository.remove(qualitativeLabel);

      return res.json({
        success: true,
        message: "Etiqueta cualitativa eliminada exitosamente",
      });
    } catch (error) {
      console.error("Error deleting qualitative label:", error);
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al eliminar la etiqueta cualitativa",
      });
    }
  }
}

export default QualitativeLabelController;
