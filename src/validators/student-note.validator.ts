import { body, query } from "express-validator";

export const createStudentNoteValidator = [
  body("studentId")
    .notEmpty()
    .withMessage("El ID del estudiante es requerido")
    .isInt()
    .withMessage("El ID del estudiante debe ser un número entero")
    .toInt(),

  body("noteId")
    .notEmpty()
    .withMessage("El ID de la nota es requerido")
    .isInt()
    .withMessage("El ID de la nota debe ser un número entero")
    .toInt(),

  body("qualitativeValueId")
    .optional()
    .isInt()
    .withMessage("El ID del valor cualitativo debe ser un número entero")
    .toInt(),

  body("numericValue")
    .optional()
    .isInt()
    .withMessage("El valor numérico debe ser un número entero")
    .toInt(),
];

export const updateStudentNoteValidator = [
  body("studentId")
    .optional()
    .isInt()
    .withMessage("El ID del estudiante debe ser un número entero")
    .toInt(),

  body("noteId")
    .optional()
    .isInt()
    .withMessage("El ID de la nota debe ser un número entero")
    .toInt(),

  body("qualitativeValueId")
    .optional()
    .isInt()
    .withMessage("El ID del valor cualitativo debe ser un número entero")
    .toInt(),

  body("numericValue")
    .optional()
    .isInt()
    .withMessage("El valor numérico debe ser un número entero")
    .toInt(),
];

export const searchStudentNoteValidator = [
  query("courseId")
    .optional()
    .isInt()
    .withMessage("El ID del curso debe ser un número entero")
    .toInt(),

  query("studentId")
    .optional()
    .isInt()
    .withMessage("El ID del estudiante debe ser un número entero")
    .toInt(),

  query("scholarYearPeriodId")
    .optional()
    .isInt()
    .withMessage("El ID del período académico debe ser un número entero")
    .toInt(),
];
