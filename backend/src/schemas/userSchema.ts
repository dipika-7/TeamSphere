import Joi from "joi";

const signUpSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
  designation: Joi.string().required().messages({
    "any.required": "Designation is required",
    "string.empty": "Designation cannot be empty",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have at least 8 characters",
      "string.pattern.base":
        "Password should contain at least one letter, one number, and may include special characters",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have at least 8 characters",
  }),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have at least 8 characters",
  }),
  newPassword: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have at least 8 characters",
      "string.pattern.base":
        "Password should contain at least one letter, one number, and may include special characters",
    }),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Refresh Token is required",
    "string.empty": "Refresh Token cannot be empty",
  }),
});

const updateUserSchema = Joi.object({
  username: Joi.string().messages({
    "string.empty": "Username cannot be empty",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
  designation: Joi.string().messages({
    "string.empty": "Designation cannot be empty",
  }),
});

export {
  signUpSchema,
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
  updateUserSchema,
};
