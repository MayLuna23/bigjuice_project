const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del usuario es requerido.",
  }),
  rol: Joi.string().required().empty("").messages({
    "any.required": "El Rol del usuario es requerido.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del usuario es requerida.",
  }),
  id: Joi.number().required().min(1000).empty("").messages({
    "any.required": "El Id del usuario es requerido, minimo 4 digitos.",
    "number.min": "El Id del usuario debe tener al menos 4 dígitos.",
    "number.max": "El Id del usuario debe tener maximo 4 dígitos.",
  }),
  password: Joi.string().required().empty("").allow("").min(4).max(4).messages({
    "any.required": "El Password del usuario es requerido.",
    "string.min": "El Password del usuario debe tener minimo 4 digitos.",
    "string.max": "El Password del usuario debe tener maximo 4 digitos.",
  }),
  email: Joi.string().required().email().empty("").messages({
    "any.required": "El Correo del usuario es requerido.",
    "string.email": "El Correo del usuario debe tener un formato válido.",
  }),
  phone: Joi.number().required().min(100000).empty("").messages({
    "any.required": "El Telefono del usuario es requerido.",
    "number.min": "El Telefono del usuario debe tener al menos 6 dígitos.",
  }),
  address: Joi.string().required().empty("").messages({
    "any.required": "La dirección del usuario es requerido.",
  }),
  cedula: Joi.string().required().empty("").messages({
    "any.required": "La cédula del usuario es requerido.",
  }),
});

const editUserSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del usuario es requerido.",
  }),
  rol: Joi.string().required().empty("").messages({
    "any.required": "El Rol del usuario es requerido.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del usuario es requerida.",
  }),
  id: Joi.number().required().min(1000).empty("").messages({
    "any.required": "El Id del usuario es requerido, minimo 4 digitos.",
    "number.min": "El Id del usuario debe tener al menos 4 dígitos.",
    "number.max": "El Id del usuario debe tener maximo 4 dígitos.",
  }),
  password: Joi.string().empty("").allow("").min(4).max(4).messages({
    "any.required": "El Password del usuario es requerido.",
    "string.min": "El Password del usuario debe tener minimo 4 digitos.",
    "string.max": "El Password del usuario debe tener maximo 4 digitos.",
  }),
  email: Joi.string().required().email().empty("").messages({
    "any.required": "El Correo del usuario es requerido.",
    "string.email": "El Correo del usuario debe tener un formato válido.",
  }),
  phone: Joi.number().required().min(100000).empty("").messages({
    "any.required": "El Telefono del usuario es requerido.",
    "number.min": "El Telefono del usuario debe tener al menos 6 dígitos.",
  }),
  address: Joi.string().required().empty("").messages({
    "any.required": "La dirección del usuario es requerido.",
  }),
  cedula: Joi.string().required().empty("").messages({
    "any.required": "La cédula del usuario es requerido.",
  }),
  registration_date: Joi.string().empty("")
});

module.exports = { createUserSchema, editUserSchema };
