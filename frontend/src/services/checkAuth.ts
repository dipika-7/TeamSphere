import { USER_ENDPOINTS } from "../constants/endpoint";
import { http } from "./httpService";

const checkAuth = async () => {
  const accessToken = localStorage.getItem("accessToken") || "";

  try {
    if (accessToken !== "") {
      const response = await http.get(USER_ENDPOINTS.PROFILE);
      console.log(response.data.data);
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
