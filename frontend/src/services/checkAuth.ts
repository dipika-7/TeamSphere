import { http } from "./httpService";
import { headers } from "../utils/authHeaderUtil";

const checkAuth = async () => {
  const accessToken = localStorage.getItem("accessToken") || "";
  // const refreshToken = localStorage.getItem("refreshToken") || "";
  // if (accessToken !== "") {
  //   try {
  //     const response = await http.get("/users", { headers });
  //     console.log(response.data.data);
  //     if (response) {
  //       return response.data.data;
  //     } else {
  //       throw new Error();
  //     }
  //   } catch (e) {
  //     window.location.href = "/views/login/";
  //   }
  // } else {
  //   window.location.href = "/views/login/";
  // }
  try {
    if (accessToken !== "") {
      const response = await http.get("/users/profile", { headers });
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
