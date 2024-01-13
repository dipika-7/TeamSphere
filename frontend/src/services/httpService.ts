import axios from "axios";
import { API_URL } from "../constants/config";
import { getNewAccessToken } from "./authService";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

http.interceptors.request.use(
  async (config) => {
    console.log(config);
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
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await getNewAccessToken(refreshToken);
        // Retry the original request
      }
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
