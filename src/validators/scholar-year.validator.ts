import { body } from "express-validator";

export const scholarYearValidator = [
  body("year")
    .notEmpty()
    .withMessage("El año es requerido")
    .isString()
    .withMessage("El año debe ser una cadena de texto")
    .trim(),

  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .trim(),

  body("evaluationSystemId")
    .optional()
    .isInt()
    .withMessage("El ID del sistema de evaluación debe ser un número entero")
    .toInt(),
];
