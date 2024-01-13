import Joi from "joi";

export const UserTeamSchema = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "User Id is required",
    "string.empty": "User Id cannot be empty",
  }),
  teamId: Joi.string().required().messages({
    "any.required": "Team Id is required",
    "string.empty": "Team Id cannot be empty",
  }),
});

export const updateUserTeamSchema = Joi.object({
  userId: Joi.string().messages({
    "any.required": "User Id is required",
    "string.empty": "User Id cannot be empty",
  }),
  teamId: Joi.string().messages({
    "any.required": "Team Id is required",
    "string.empty": "Team Id cannot be empty",
  }),
});
