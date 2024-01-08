import Joi from "joi";

const createTeamSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Team name is required",
    "string.empty": "Team name cannot be empty",
  }),
  description: Joi.string().messages({
    "string.empty": "description cannot be empty",
  }),
});

const updateTeamSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Team name cannot be empty",
  }),
  description: Joi.string().messages({
    "string.empty": "description cannot be empty",
  }),
});

export { createTeamSchema, updateTeamSchema };
