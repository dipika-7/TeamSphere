import Joi from "joi";

const createCardSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().messages({
    "string.empty": "Description cannot be empty",
  }),
  status: Joi.string()
    .valid("complete", "incomplete")
    .default("incomplete")
    .messages({
      "any.only": 'status must be either "complete" or "incomplete"',
      "string.empty": "status cannot be empty",
    }),
  deadline: Joi.date().required().messages({
    "any.required": "deadline is required",
    "date.base": "deadline must be a valid date",
  }),
  listId: Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "any.required": "listId is required",
    "string.uuid": "listId must be a valid UUID",
  }),
  assignedTo: Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "any.required": "assignedTo is required",
    "string.uuid": "assignedTo must be a valid UUID",
  }),
});

const updateCardSchema = Joi.object({
  title: Joi.string().messages({
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().messages({
    "string.empty": "Description cannot be empty",
  }),
  status: Joi.valid("complete", "incomplete").messages({
    "any.only": 'status must be either "complete" or "incomplete"',
    "string.empty": "status cannot be empty",
  }),
  deadline: Joi.date().messages({
    "date.base": "deadline must be a valid date",
  }),
  listId: Joi.string().uuid({ version: "uuidv4" }).messages({
    "string.uuid": "listId must be a valid UUID",
  }),
  assignedTo: Joi.string().uuid({ version: "uuidv4" }).messages({
    "string.uuid": "assignedTo must be a valid UUID",
  }),
  priority: Joi.number().min(1).messages({
    "number.base": "Priority must be a number",
    "number.min": "Priority must be greater than or equal to 1",
  }),
});

export { createCardSchema, updateCardSchema };
