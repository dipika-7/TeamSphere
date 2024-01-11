import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { AxiosError } from "axios";

export async function register(user: {
  username: string;
  email: string;
  password: string;
  designation: string;
}) {
  try {
    const response = await http.post("/auth/signup", user);

    console.log("Signup success", response, response.data.status);
    if (response.data.status === 200) {
      showToastMessage("success", response.data.message);
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function login(user: { email: string; password: string }) {
  try {
    const response = await http.post("/auth/login", user);
    console.log(response);
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      showToastMessage("success", response.data.message);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}
