const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().required().empty("").allow("").messages({
    "any.required": "El Nombre del producto es requerido.",
  }),
  category: Joi.string().empty("").allow("").messages({
    "any.required": "La Categoria del producto es requerido.",
  }),
  tarrina: Joi.number().empty("").allow("").messages({
    // "any.required": "La Categoria del producto es requerido.",
  }),
  pitillo: Joi.number().empty("").allow("").messages({
    // "any.required": "La Categoria del producto es requerido.",
  }),
  sale_price: Joi.number().required().empty("").messages({
    "any.required": "El Precio de venta del producto es requerido.",
    "number.base": "El Precio de venta del producto debe ser un número.",
  }),
  hielo: Joi.number().required().empty("").messages({
    "any.required": "El Hielo es requerido.",
    "number.base": "El Hielo debe ser un número.",
  }),
  leche: Joi.number().required().empty("").messages({
    "any.required": "La Leche es requerida.",
    "number.base": "La Leche debe ser un número.",
  }),
  leche_polvo: Joi.number().required().empty("").messages({
    "any.required": "La Leche en polvo es requerida",
    "number.base": "La Leche en polvo debe ser un número.",
  }),
  azucar: Joi.number().required().empty("").messages({
    "any.required": "El Azucar es requerida.",
    "number.base": "El Azucar debe ser un número.",
  }),
  saborizante: Joi.number().required().empty("").messages({
    "any.required": "El Saborizante es requerido.",
    "number.base": "El Saborizante debe ser un número.",
  }),
  canela: Joi.number().required().empty("").messages({
    "any.required": "La Canela requerido.",
    "number.base": "La Canela debe ser un número.",
  }),
  miel: Joi.number().required().empty("").messages({
    "any.required": "La Miel es requerida.",
    "number.base": "La Miel debe ser un número.",
  }),
  quantity: Joi.number().required().empty("").messages({
    "any.required": "El Stock Inicial es requerido.",
    "number.base": "El Stock Inicial debe ser un número.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicacion es requerida.",
  }),
});

const editProductSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del producto es requerido.",
  }),
  rol: Joi.string().required().empty("").messages({
    "any.required": "El Rol del producto es requerido.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del producto es requerida.",
  }),
  id: Joi.number().required().min(1000).empty("").messages({
    "any.required": "El Id del producto es requerido, minimo 4 digitos.",
    "number.min": "El Id del producto debe tener al menos 4 dígitos.",
    "number.max": "El Id del producto debe tener maximo 4 dígitos.",
  }),
});

module.exports = { createProductSchema, editProductSchema };
