import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.css";

import { HttpStatusCode } from "axios";

import { http } from "../../services/httpService";
import { ILogin } from "../../interfaces/authInterface";

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const registerBtn = document.getElementById("register-btn") as HTMLFormElement;
const emailInput = document.getElementById("login-email") as HTMLFormElement;
const passwordInput = document.getElementById(
  "login-password"
) as HTMLFormElement;

const validateInput = (data: ILogin) => {
  if (data.email == "") {
    emailInput.classList.add("is-invalid");
    return false;
  }

  if (data.password == "") {
    passwordInput.classList.add("is-invalid");
    return false;
  }

  return true;
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");

  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const data = {
    email,
    password,
  };
  if (validateInput(data)) {
    await login(data);
  }
  return;
});

async function login(user: { email: string; password: string }) {
  try {
    const response = await http.post("/auth/login", user);

    if (response.status === HttpStatusCode.Accepted) {
    }
    console.log("Login success", response);
  } catch (error) {
    console.log(error);
  }
}

registerBtn.addEventListener("click", function () {
  window.location.href = "/views/signup/";
});
