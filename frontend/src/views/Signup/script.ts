import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.css";
import { http } from "../../services/httpService";

const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;

// const validateInput = (data) => {};

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = registerForm.username.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  await register({ username, email, password, designation: "afctag" });

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
    console.log(error);
  }
}
