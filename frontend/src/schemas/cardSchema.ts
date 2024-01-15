import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const createCardSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  deadline: yup
    .date()
    .required("Deadline is required")
    .min(today, "Date must be greater than or equal to today date")
    .typeError("Please enter a valid date"),
  assignedTo: yup.string().required("Assigned To is required"),
});

export const updateCardSchema = yup.object().shape({
  editCardTitle: yup.string().required("Title is required"),
  editCardDescription: yup.string().required("Description is required"),
  editCardDeadline: yup
    .date()
    .required("Deadline is required")
    .min(today, "Date must be greater than or equal to today date")
    .typeError("Please enter a valid date"),
});
