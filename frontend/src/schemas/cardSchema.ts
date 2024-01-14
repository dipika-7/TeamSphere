import * as yup from "yup";

export const createCardSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  deadline: yup
    .date()
    .required("Deadline is required")
    .min(new Date(), "Date must be greater than or equal to today date")
    .typeError("Please enter a valid date"),
  assignedTo: yup.string().required("Assigned To is required"),
});
