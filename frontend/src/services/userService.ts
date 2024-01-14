import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { AxiosError } from "axios";
import { USER_ENDPOINTS, USER_TEAM_ENDPOINTS } from "../constants/endpoint";

export async function getUserProfile() {
  try {
    const response = await http.get(USER_ENDPOINTS.PROFILE);

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getUserByUsername(username: string) {
  try {
    const response = await http.get(`${USER_ENDPOINTS.USERS}/${username}`);

    console.log("User get by username");
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getUserList(teamId: string) {
  try {
    const response = await http.get(`${USER_ENDPOINTS.USERS_LIST}/${teamId}`);
    console.log(response.data);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getTeamListByUserId() {
  try {
    const response = await http.get(USER_TEAM_ENDPOINTS.USER_TEAM_BY_USER_ID);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}
