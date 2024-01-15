import { ValidationError } from "yup";
import { signupSchema } from "../../schemas/authSchema";
import { register } from "../../services/authService";
import {
  displayValidationError,
  validateFormData,
} from "../../utils/validateUtil";
import { AxiosError } from "axios";
import { showToastMessage } from "../../utils/responseUtil";

const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const username = registerForm.username.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const confirmPassword = registerForm.confirmPassword.value.trim();
    const designation = registerForm.designation.value.trim();

    const user = {
      username,
      email,
      password,
      designation,
      confirmPassword,
    };

    const validateData = await validateFormData(signupSchema, user);

    if (validateData) {
      delete user.confirmPassword;
      await register(user);
    }
    return;
  } catch (e) {
    if (e instanceof ValidationError) {
      e.inner.forEach((error) => {
        displayValidationError(registerForm, error.path!, error.message);
      });
    }
    if (e instanceof AxiosError) {
      showToastMessage("error", e.response?.data.message);
    }
  }
});

registerForm.email.addEventListener("input", () => {
  registerForm.email.classList.remove("is-invalid");
});
registerForm.username.addEventListener("input", () => {
  registerForm.username.classList.remove("is-invalid");
});
registerForm.designation.addEventListener("input", () => {
  registerForm.designation.classList.remove("is-invalid");
});
registerForm.password.addEventListener("input", () => {
  registerForm.password.classList.remove("is-invalid");
});
registerForm.confirmPassword.addEventListener("input", () => {
  registerForm.confirmPassword.classList.remove("is-invalid");
});
