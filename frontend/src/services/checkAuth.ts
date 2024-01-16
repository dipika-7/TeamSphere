import { USER_ENDPOINTS } from "../constants/endpoint";
import { http } from "./httpService";

const checkAuth = async () => {
  const accessToken = localStorage.getItem("accessToken") || "";

  try {
    if (accessToken !== "") {
      await http.get(USER_ENDPOINTS.PROFILE);
      return true;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    localStorage.clear();
    window.location.href = "/views/login/";
  }
};

await checkAuth();
