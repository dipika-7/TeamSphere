import axios from "axios";
import { API_URL } from "../constants/constant";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
