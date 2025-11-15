import { body } from "express-validator";

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
