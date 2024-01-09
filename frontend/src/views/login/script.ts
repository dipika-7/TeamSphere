import { AxiosError } from "axios";

import { http } from "../../services/httpService";
import { ILogin } from "../../interfaces/authInterface";
import { showToastMessage } from "../../utils/toastMessage";

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

  const email = emailInput.value;
  const password = passwordInput.value;
  const data = {
    email,
    password,
  };
  if (validateInput(data)) {
    console.log("Login success");
    await login(data);
  }
  return;
});

async function login(user: { email: string; password: string }) {
  try {
    const response = await http.post("/auth/login", user);
    console.log(response);
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      showToastMessage("success", response.data.message);

      window.location.href = "/views/dashboard/";
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

registerBtn.addEventListener("click", function () {
  window.location.href = "/views/signup/";
});
