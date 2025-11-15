import { body } from "express-validator";

export const createEvaluationSystemValidator = [
  body("systemName")
    .notEmpty()
    .withMessage("El nombre del sistema es requerido")
    .isString()
    .withMessage("El nombre del sistema debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("El nombre del sistema no puede exceder 255 caracteres")
    .trim(),

  body("qualitative")
    .notEmpty()
    .withMessage("El tipo cualitativo es requerido")
    .isBoolean()
    .withMessage("El tipo cualitativo debe ser verdadero o falso")
    .toBoolean(),

  body("minValue")
    .notEmpty()
    .withMessage("El valor mínimo es requerido")
    .isInt()
    .withMessage("El valor mínimo debe ser un número entero")
    .toInt(),

  body("maxValue")
    .notEmpty()
    .withMessage("El valor máximo es requerido")
    .isInt()
    .withMessage("El valor máximo debe ser un número entero")
    .toInt(),
];

export const updateEvaluationSystemValidator = [
  body("systemName")
    .optional()
    .isString()
    .withMessage("El nombre del sistema debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("El nombre del sistema no puede exceder 255 caracteres")
    .trim(),

  body("qualitative")
    .optional()
    .isBoolean()
    .withMessage("El tipo cualitativo debe ser verdadero o falso")
    .toBoolean(),

  body("minValue")
    .optional()
    .isInt()
    .withMessage("El valor mínimo debe ser un número entero")
    .toInt(),

  body("maxValue")
    .optional()
    .isInt()
    .withMessage("El valor máximo debe ser un número entero")
    .toInt(),
];
