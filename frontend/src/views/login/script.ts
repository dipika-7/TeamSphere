import { ValidationError } from "yup";
import { loginSchema } from "../../schemas/authSchema";
import { login } from "../../utils/authUtil";
import {
  displayValidationError,
  validateFormData,
} from "../../utils/validateUtil";
import { AxiosError } from "axios";
import { showToastMessage } from "../../utils/responseUtil";

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const registerBtn = document.getElementById("register-btn") as HTMLFormElement;

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    loginForm.email.classList.remove("is-invalid");
    loginForm.password.classList.remove("is-invalid");

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const data = {
      email,
      password,
    };
    const validateData = await validateFormData(loginSchema, data);
    console.log(validateData);
    if (validateData) {
      console.log("Login success");
      await login(data);
    }
    return;
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationError) {
      e.inner.forEach((error) => {
        displayValidationError(loginForm, error.path!, error.message);
      });
    }
    if (e instanceof AxiosError) {
      showToastMessage("error", e.response?.data.message);
    }
  }
});

registerBtn.addEventListener("click", function () {
  window.location.href = "/views/signup/";
});
