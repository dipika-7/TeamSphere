import * as yup from "yup";

export const createTeamSchema = yup.object().shape({
  name: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "Username can only contain alphanumeric characters"
    ),
  description: yup
    .string()
    .required("Designation is required")
    .oneOf(
      ["manager", "developer"],
      "Designation must be 'manager' or 'developer'"
    ),
});
