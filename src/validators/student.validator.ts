import { body } from "express-validator";

export const createStudentValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("El primer nombre es requerido")
    .isString()
    .withMessage("El primer nombre debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El primer nombre no puede exceder 100 caracteres")
    .trim(),

  body("secondName")
    .notEmpty()
    .withMessage("El segundo nombre es requerido")
    .isString()
    .withMessage("El segundo nombre debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El segundo nombre no puede exceder 100 caracteres")
    .trim(),

  body("lastName")
    .notEmpty()
    .withMessage("El primer apellido es requerido")
    .isString()
    .withMessage("El primer apellido debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El primer apellido no puede exceder 100 caracteres")
    .trim(),

  body("secondLastName")
    .notEmpty()
    .withMessage("El segundo apellido es requerido")
    .isString()
    .withMessage("El segundo apellido debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El segundo apellido no puede exceder 100 caracteres")
    .trim(),

  body("isRetired")
    .optional()
    .isBoolean()
    .withMessage("El estado de retiro debe ser verdadero o falso")
    .toBoolean(),

  body("courseId")
    .notEmpty()
    .withMessage("El ID del curso es requerido")
    .isInt()
    .withMessage("El ID del curso debe ser un número entero")
    .toInt(),
];

export const updateStudentValidator = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("El primer nombre debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El primer nombre no puede exceder 100 caracteres")
    .trim(),

  body("secondName")
    .optional()
    .isString()
    .withMessage("El segundo nombre debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El segundo nombre no puede exceder 100 caracteres")
    .trim(),

  body("lastName")
    .optional()
    .isString()
    .withMessage("El primer apellido debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El primer apellido no puede exceder 100 caracteres")
    .trim(),

  body("secondLastName")
    .optional()
    .isString()
    .withMessage("El segundo apellido debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El segundo apellido no puede exceder 100 caracteres")
    .trim(),

  body("isRetired")
    .optional()
    .isBoolean()
    .withMessage("El estado de retiro debe ser verdadero o falso")
    .toBoolean(),

  body("courseId")
    .optional()
    .isInt()
    .withMessage("El ID del curso debe ser un número entero")
    .toInt(),
];
