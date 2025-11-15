import { body } from "express-validator";

export const createTeacherValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("El primer nombre es requerido")
    .isString()
    .withMessage("El primer nombre debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El primer nombre no puede exceder 100 caracteres")
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
    .optional()
    .isString()
    .withMessage("El segundo apellido debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El segundo apellido no puede exceder 100 caracteres")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("Debe proporcionar un correo electrónico válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const updateTeacherValidator = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("El primer nombre debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El primer nombre no puede exceder 100 caracteres")
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

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe proporcionar un correo electrónico válido")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];
