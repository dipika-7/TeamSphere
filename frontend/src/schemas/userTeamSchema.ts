import * as yup from "yup";

export const createUserTeamSchema = yup.object().shape({
  userId: yup.string().required("UserId is required"),
  teamId: yup.string().required("TeamId is required"),
});
