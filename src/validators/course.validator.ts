import { body } from "express-validator";

export const createCourseValidator = [
  body("courseName")
    .notEmpty()
    .withMessage("El nombre del curso es requerido")
    .isString()
    .withMessage("El nombre del curso debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("El nombre del curso no puede exceder 255 caracteres")
    .trim(),

  body("teacherId")
    .notEmpty()
    .withMessage("El ID del profesor es requerido")
    .isString()
    .withMessage("El ID del profesor debe ser una cadena de texto"),

  body("scholarYearId")
    .notEmpty()
    .withMessage("El ID del año escolar es requerido")
    .isInt()
    .withMessage("El ID del año escolar debe ser un número entero")
    .toInt(),
];

export const updateCourseValidator = [
  body("courseName")
    .optional()
    .isString()
    .withMessage("El nombre del curso debe ser una cadena de texto")
    .isLength({ max: 255 })
    .withMessage("El nombre del curso no puede exceder 255 caracteres")
    .trim(),

  body("teacherId")
    .optional()
    .isString()
    .withMessage("El ID del profesor debe ser una cadena de texto"),

  body("scholarYearId")
    .optional()
    .isInt()
    .withMessage("El ID del año escolar debe ser un número entero")
    .toInt(),
];
