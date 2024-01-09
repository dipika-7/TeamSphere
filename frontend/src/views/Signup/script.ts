import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.css";
import { http } from "../../services/httpService";
import { ISignUp } from "../../interfaces/authInterface";

const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;
const usernameInput = document.getElementById(
  "register-username"
) as HTMLFormElement;
const emailInput = document.getElementById("register-email") as HTMLFormElement;
const passwordInput = document.getElementById(
  "register-password"
) as HTMLFormElement;
const confirmPasswordInput = document.getElementById(
  "register-confirm-password"
) as HTMLFormElement;
const designationInput = document.getElementById(
  "register-designation"
) as HTMLFormElement;
const confirmPasswordError = document.getElementById(
  "invalid-confirm-password"
) as HTMLFormElement;

const loginBtn = document.getElementById("login-btn") as HTMLFormElement;

const validateInput = (data: ISignUp) => {
  if (data.username == "") {
    usernameInput.classList.add("is-invalid");
    return false;
  }
  if (data.email == "") {
    emailInput.classList.add("is-invalid");
    return false;
  }
  if (data.designation == "") {
    designationInput.classList.add("is-invalid");
    return false;
  }
  if (data.password == "") {
    passwordInput.classList.add("is-invalid");
    return false;
  }
  if (data.confirmPassword == "") {
    confirmPasswordInput.classList.add("is-invalid");
    return false;
  }

  if (data.password !== data.confirmPassword) {
    console.log("not match");
    confirmPasswordInput.classList.add("is-invalid");
    confirmPasswordError.innerHTML = "Passwords does not match";
    return false;
  }
  return true;
};

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  usernameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  designationInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  confirmPasswordInput.classList.remove("is-invalid");

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const designation = designationInput.value.trim();

  const user = {
    username,
    email,
    password,
    designation,
    confirmPassword,
  };
  if (validateInput(user)) {
    delete user.confirmPassword;
    await register(user);
  }

  return;
});

async function register(user: {
  username: string;
  email: string;
  password: string;
  designation: string;
}) {
  try {
    const response = await http.post("/auth/signup", user);

    console.log("Signup success", response);
  } catch (error) {
    console.log({ error });
  }
}

loginBtn.addEventListener("click", function () {
  window.location.href = "../login/";
});
