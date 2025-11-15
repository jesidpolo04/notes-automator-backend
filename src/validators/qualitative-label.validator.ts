import { body } from "express-validator";

export const createQualitativeLabelValidator = [
  body("label")
    .notEmpty()
    .withMessage("La etiqueta es requerida")
    .isString()
    .withMessage("La etiqueta debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("La etiqueta no puede exceder 100 caracteres")
    .trim(),

  body("evaluationSystemId")
    .notEmpty()
    .withMessage("El ID del sistema de evaluación es requerido")
    .isInt()
    .withMessage("El ID del sistema de evaluación debe ser un número entero")
    .toInt(),
];

export const updateQualitativeLabelValidator = [
  body("label")
    .optional()
    .isString()
    .withMessage("La etiqueta debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("La etiqueta no puede exceder 100 caracteres")
    .trim(),

  body("evaluationSystemId")
    .optional()
    .isInt()
    .withMessage("El ID del sistema de evaluación debe ser un número entero")
    .toInt(),
];
