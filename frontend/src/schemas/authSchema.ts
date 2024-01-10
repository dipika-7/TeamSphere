import * as yup from "yup";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "Username can only contain alphanumeric characters"
    ),
  email: yup.string().email("Invalid email").required("Email is required"),
  designation: yup
    .string()
    .required("Designation is required")
    .oneOf(
      ["manager", "developer"],
      "Designation must be 'manager' or 'developer'"
    ),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,30}$/,
      "Password should contain at least one letter, one number, and may include special characters and be at least 8 characters"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
