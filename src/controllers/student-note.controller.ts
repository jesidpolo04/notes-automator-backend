import { Request, Response } from "express";
import { AppDataSource } from "@/database/postgres.config";
import { StudentNote } from "@/entities/student-note/student-note";
import { Student } from "@/entities/student/student";
import { Note } from "@/entities/note/note";
import { QualitativeLabel } from "@/entities/qualitative-label/qualitative-label";
import { logger } from "@/logging";

class StudentNoteController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const studentNoteRepository = AppDataSource.getRepository(StudentNote);
      const studentNotes = await studentNoteRepository.find({
        relations: ["student", "note", "qualitativeValue"],
      });

      return res.json({
        success: true,
        data: studentNotes,
        count: studentNotes.length,
      });
    } catch (error) {
      logger.error(error, "Error fetching student notes:");
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al obtener las notas de estudiantes",
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const studentNoteRepository = AppDataSource.getRepository(StudentNote);

      const studentNote = await studentNoteRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["student", "note", "qualitativeValue"],
      });

      if (!studentNote) {
        return res.status(404).json({
          success: false,
          message: "Nota de estudiante no encontrada",
        });
      }

      return res.json({
        success: true,
        data: studentNote,
      });
    } catch (error) {
      logger.error(error, "Error fetching student note:");
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener la nota del estudiante",
      });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { studentId, noteId, qualitativeValueId, numericValue } = req.body;

      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOne({
        where: { id: studentId },
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudiante no encontrado",
        });
      }

      const noteRepository = AppDataSource.getRepository(Note);
      const note = await noteRepository.findOne({
        where: { id: noteId },
      });

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Nota no encontrada",
        });
      }

      let qualitativeValue = undefined;
      if (qualitativeValueId) {
        const qualitativeLabelRepository =
          AppDataSource.getRepository(QualitativeLabel);
        qualitativeValue = await qualitativeLabelRepository.findOne({
          where: { id: qualitativeValueId },
        });

        if (!qualitativeValue) {
          return res.status(404).json({
            success: false,
            message: "Etiqueta cualitativa no encontrada",
          });
        }
      }

      const studentNoteRepository = AppDataSource.getRepository(StudentNote);
      const studentNote = studentNoteRepository.create({
        student,
        note,
        qualitativeValue,
        numericValue,
      });

      const savedStudentNote = await studentNoteRepository.save(studentNote);

      const completeStudentNote = await studentNoteRepository.findOne({
        where: { id: savedStudentNote.id },
        relations: ["student", "note", "qualitativeValue"],
      });

      return res.status(201).json({
        success: true,
        message: "Nota de estudiante creada exitosamente",
        data: completeStudentNote,
      });
    } catch (error) {
      logger.error(error, "Error creating student note:");
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear la nota del estudiante",
      });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { studentId, noteId, qualitativeValueId, numericValue } = req.body;

      const studentNoteRepository = AppDataSource.getRepository(StudentNote);
      const studentNote = await studentNoteRepository.findOne({
        where: { id: Number.parseInt(id) },
      });

      if (!studentNote) {
        return res.status(404).json({
          success: false,
          message: "Nota de estudiante no encontrada",
        });
      }

      const updateData: any = {};

      if (studentId) {
        const studentRepository = AppDataSource.getRepository(Student);
        const student = await studentRepository.findOne({
          where: { id: studentId },
        });

        if (!student) {
          return res.status(404).json({
            success: false,
            message: "Estudiante no encontrado",
          });
        }

        updateData.student = student;
      }

      if (noteId) {
        const noteRepository = AppDataSource.getRepository(Note);
        const note = await noteRepository.findOne({
          where: { id: noteId },
        });

        if (!note) {
          return res.status(404).json({
            success: false,
            message: "Nota no encontrada",
          });
        }

        updateData.note = note;
      }

      if (qualitativeValueId) {
        const qualitativeLabelRepository =
          AppDataSource.getRepository(QualitativeLabel);
        const qualitativeValue = await qualitativeLabelRepository.findOne({
          where: { id: qualitativeValueId },
        });

        if (!qualitativeValue) {
          return res.status(404).json({
            success: false,
            message: "Etiqueta cualitativa no encontrada",
          });
        }

        updateData.qualitativeValue = qualitativeValue;
      }

      if (numericValue !== undefined) {
        updateData.numericValue = numericValue;
      }

      await studentNoteRepository.update(Number.parseInt(id), updateData);

      const updatedStudentNote = await studentNoteRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["student", "note", "qualitativeValue"],
      });

      return res.json({
        success: true,
        message: "Nota de estudiante actualizada exitosamente",
        data: updatedStudentNote,
      });
    } catch (error) {
      logger.error(error, "Error updating student note:");
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al actualizar la nota del estudiante",
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const studentNoteRepository = AppDataSource.getRepository(StudentNote);

      const studentNote = await studentNoteRepository.findOne({
        where: { id: Number.parseInt(id) },
      });

      if (!studentNote) {
        return res.status(404).json({
          success: false,
          message: "Nota de estudiante no encontrada",
        });
      }

      await studentNoteRepository.remove(studentNote);

      return res.json({
        success: true,
        message: "Nota de estudiante eliminada exitosamente",
      });
    } catch (error) {
      logger.error(error, "Error deleting student note:");
      return res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al eliminar la nota del estudiante",
      });
    }
  }

  static async search(req: Request, res: Response): Promise<Response> {
    try {
      const { courseId, studentId, scholarYearPeriodId } = req.query;

      const queryBuilder = AppDataSource
        .getRepository(StudentNote)
        .createQueryBuilder("studentNote")
        .innerJoin("studentNote.note", "note");

      if (studentId) {
        queryBuilder.andWhere("studentNote.student = :studentId", {
          studentId,
        });
      }

      if (courseId) {
        queryBuilder.andWhere("note.course = :courseId", {
          courseId,
        });
      }

      if (scholarYearPeriodId) {
        queryBuilder.andWhere("note.scholarYearPeriod = :scholarYearPeriodId", {
          scholarYearPeriodId,
        });
      }

      const studentNotes = await queryBuilder.getMany();

      return res.json({
        success: true,
        data: studentNotes,
        count: studentNotes.length,
      });
    } catch (error) {
      logger.error(error, "Error searching student notes:");
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al buscar las notas de estudiantes",
      });
    }
  }
}

export default StudentNoteController;
