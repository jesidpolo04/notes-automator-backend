import { body, param } from "express-validator";

export const createNoteValidator = [
  body("description")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("La descripción no puede exceder 255 caracteres")
    .trim(),

  body("courseId")
    .notEmpty()
    .withMessage("El ID del curso es requerido")
    .isInt()
    .withMessage("El ID del curso debe ser un número entero")
    .toInt(),

  body("scholarYearPeriodId")
    .notEmpty()
    .withMessage("El ID del período del año escolar es requerido")
    .isInt()
    .withMessage("El ID del período del año escolar debe ser un número entero")
    .toInt(),

  body("weight")
    .notEmpty()
    .withMessage("El peso es requerido")
    .isFloat({ min: 0 })
    .withMessage("El peso debe ser un número decimal mayor o igual a 0")
    .toFloat(),
];

export const updateNoteValidator = [
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("La descripción no puede exceder 255 caracteres")
    .trim(),

  body("courseId")
    .optional()
    .isInt()
    .withMessage("El ID del curso debe ser un número entero")
    .toInt(),

  body("scholarYearPeriodId")
    .optional()
    .isInt()
    .withMessage("El ID del período del año escolar debe ser un número entero")
    .toInt(),

  body("weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El peso debe ser un número decimal mayor o igual a 0")
    .toFloat(),

  param("id").notEmpty().isInt().withMessage("El ID de la nota es requerido"),
];
