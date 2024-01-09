import Joi from "joi";

const createListSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  teamId: Joi.string().messages({
    "string.empty": "Team Id cannot be empty",
  }),
});

const updateListSchema = Joi.object({
  title: Joi.string().messages({
    "string.empty": "Title cannot be empty",
  }),
  order: Joi.number().positive().messages({
    "number.base": "Order must be a number",
    "number.positive": "Order must be greater than 0",
  }),
});

export { createListSchema, updateListSchema };
