import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { AxiosError } from "axios";
import { AUTH_ENDPOINTS } from "../constants/endpoint";

export async function register(user: {
  username: string;
  email: string;
  password: string;
  designation: string;
}) {
  try {
    const response = await http.post(AUTH_ENDPOINTS.REGISTER, user);

    if (response.data.status === 200) {
      showToastMessage("success", response.data.message);
      setTimeout(() => {
        window.location.href = "/views/login";
      }, 1000);
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
    const response = await http.post(AUTH_ENDPOINTS.LOGIN, user);
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      showToastMessage("success", response.data.message);
      setTimeout(() => {
        window.location.href = "/views/dashboard";
      }, 1000);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getNewAccessToken(refreshToken: string) {
  try {
    const response = await http.post(AUTH_ENDPOINTS.REFRESH, { refreshToken });
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function logout(refreshToken: string) {
  try {
    const response = await http.post(AUTH_ENDPOINTS.LOGOUT, { refreshToken });
    if (response.status == 200) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      showToastMessage("success", response.data.message);
      setTimeout(() => {
        window.location.href = "/views/login";
      }, 1000);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}
