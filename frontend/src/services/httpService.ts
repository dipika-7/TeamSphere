import axios from "axios";
import { API_URL } from "../constants/config";
import { getNewAccessToken, logout } from "./authService";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

http.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          await getNewAccessToken(refreshToken);
          // Retry the original request
          return http(error.config);
        } catch (refreshError) {
          console.log("Error refreshing access token:", refreshError);
          await logout(refreshToken);
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
