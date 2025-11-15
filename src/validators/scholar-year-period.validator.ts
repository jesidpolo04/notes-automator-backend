import { body } from "express-validator";

export const createScholarYearPeriodValidator = [
  body("description")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("La descripción no puede exceder 255 caracteres")
    .trim(),

  body("scholarYearId")
    .notEmpty()
    .withMessage("El ID del año escolar es requerido")
    .isInt()
    .withMessage("El ID del año escolar debe ser un número entero")
    .toInt(),
];

export const updateScholarYearPeriodValidator = [
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("La descripción no puede exceder 255 caracteres")
    .trim(),

  body("scholarYearId")
    .optional()
    .isInt()
    .withMessage("El ID del año escolar debe ser un número entero")
    .toInt(),
];
