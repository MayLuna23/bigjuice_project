const Joi = require("joi");

const createSupplierSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del Proveedor es requerido.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del Proveedor es requerida.",
  }),
  phone: Joi.number().required().empty("").min(100000).messages({
    "any.required": "El Telefono del proveedor es requerido.",
    "number.min": "El Telefono del proveedor debe tener al menos 6 dígitos.",
  }),
  email: Joi.required().empty("").messages({
    "any.required": "El Email del Proveedor es requerido.",
    "string.email": "El Email debe tener un formato válido.",
  }),
  ingredient: Joi.string().required().empty("").allow("").messages({
    "any.required": "El Producto que distribuye el proveedor es requerido.",
  }),
  date: Joi.string().empty("").allow("").messages({
    // "any.required": "El Producto que distribuye el proveedor es requerido.",
  }),
});

const editSupplierSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del Proveedor es requerido.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del Proveedor es requerida.",
  }),
  phone: Joi.number().required().empty("").allow("").min(100000).messages({
    "any.required": "El Telefono del proveedor es requerido.",
    "number.min": "El Telefono del proveedor debe tener al menos 6 dígitos.",
  }),
  email: Joi.required().empty("").allow("").messages({
    "any.required": "El Email del Proveedor es requerido.",
    "string.email": "El Email debe tener un formato válido.",
  }),
  ingredient: Joi.string().required().empty("").allow("").messages({
    "any.required": "El Producto que distribuye el proveedor es requerido.",
  }),
  date: Joi.string().empty("").allow("").messages({
    // "any.required": "El Producto que distribuye el proveedor es requerido.",
  }),
});

module.exports = { createSupplierSchema, editSupplierSchema };
