const Joi = require("joi");

const createIngredientSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del Ingrediente es requerido.",
  }),
  quantity: Joi.number().required().empty("").messages({
    "any.required": "La cantidad del Ingrediente es requerida.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del Ingrediente es requerida.",
  }),
  category: Joi.string().required().empty("").allow("").messages({
    "any.required": "La Ubicación del Ingrediente es requerida.",
  }),
});

const editIngredientSchema = Joi.object({
  name: Joi.string().required().empty("").messages({
    "any.required": "El Nombre del Ingrediente es requerido.",
  }),
  ubication: Joi.string().required().empty("").messages({
    "any.required": "La Ubicación del Ingrediente es requerida.",
  }),
  phone: Joi.number().required().empty("").allow("").min(100000).messages({
    "any.required": "El Telefono del Ingrediente es requerido.",
    "number.min": "El Telefono del Ingrediente debe tener al menos 6 dígitos.",
  }),
  email: Joi.required().empty("").allow("").messages({
    "any.required": "El Email del Ingrediente es requerido.",
    "string.email": "El Email debe tener un formato válido.",
  }),
  ingredient: Joi.string().required().empty("").allow("").messages({
    "any.required": "El Ingrediente que distribuye el Ingrediente es requerido.",
  }),
  date: Joi.string().empty("").allow("").messages({
    // "any.required": "El Ingrediente que distribuye el Ingrediente es requerido.",
  }),
});

module.exports = { createIngredientSchema, editIngredientSchema };
