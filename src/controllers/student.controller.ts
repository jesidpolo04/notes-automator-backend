import { Request, Response } from "express";
import { AppDataSource } from "@/database/postgres.config";
import { Student } from "@/entities/student/student";
import { Course } from "@/entities/course/course";

class StudentController {
  // GET /students - Get all students
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const students = await studentRepository.find({
        relations: ["course"],
      });

      return res.json({
        success: true,
        data: students,
        count: students.length,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener estudiantes",
      });
    }
  }

  // GET /students/:id - Get student by ID
  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const studentRepository = AppDataSource.getRepository(Student);

      const student = await studentRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["course"],
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudiante no encontrado",
        });
      }

      return res.json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.error("Error fetching student:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener el estudiante",
      });
    }
  }

  // POST /students - Create new student
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        firstName,
        secondName,
        lastName,
        secondLastName,
        isRetired = false,
        courseId,
      } = req.body;

      // Verify course exists
      const courseRepository = AppDataSource.getRepository(Course);
      const course = await courseRepository.findOne({
        where: { id: courseId },
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Curso no encontrado",
        });
      }

      const studentRepository = AppDataSource.getRepository(Student);
      const student = studentRepository.create({
        firstName,
        secondName,
        lastName,
        secondLastName,
        isRetired,
        course,
      });

      const savedStudent = await studentRepository.save(student);

      // Fetch the complete student with relations
      const completeStudent = await studentRepository.findOne({
        where: { id: savedStudent.id },
        relations: ["course"],
      });

      return res.status(201).json({
        success: true,
        message: "Estudiante creado exitosamente",
        data: completeStudent,
      });
    } catch (error) {
      console.error("Error creating student:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear el estudiante",
      });
    }
  }

  // PUT /students/:id - Update student
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { courseId, ...updateData } = req.body;

      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudiante no encontrado",
        });
      }

      // If courseId is provided, verify it exists
      if (courseId) {
        const courseRepository = AppDataSource.getRepository(Course);
        const course = await courseRepository.findOne({
          where: { id: courseId },
        });

        if (!course) {
          return res.status(404).json({
            success: false,
            message: "Curso no encontrado",
          });
        }

        updateData.course = course;
      }

      // Update student
      await studentRepository.update(Number.parseInt(id), updateData);

      // Fetch updated student
      const updatedStudent = await studentRepository.findOne({
        where: { id: Number.parseInt(id) },
        relations: ["course"],
      });

      return res.json({
        success: true,
        message: "Estudiante actualizado exitosamente",
        data: updatedStudent,
      });
    } catch (error) {
      console.error("Error updating student:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al actualizar el estudiante",
      });
    }
  }

  // DELETE /students/:id - Delete student
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const studentRepository = AppDataSource.getRepository(Student);

      const student = await studentRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudiante no encontrado",
        });
      }

      await studentRepository.remove(student);

      return res.json({
        success: true,
        message: "Estudiante eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al eliminar el estudiante",
      });
    }
  }
}

export default StudentController;
