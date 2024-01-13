import { IPartialTeam } from "../interfaces/team";
import { http } from "./httpService";
import { AxiosError } from "axios";

import { showToastMessage } from "../utils/responseUtil";
import { TEAM_ENDPOINTS } from "../constants/endpoint";

const accessToken = localStorage.getItem("accessToken");

export async function createTeam(team: IPartialTeam) {
  try {
    console.log("createTeam");
    const response = await http.post(TEAM_ENDPOINTS.TEAM, team);

    if (response.status === 200) {
      showToastMessage("success", response.data.message);
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getTeamById(id: string) {
  try {
    console.log("getTeamById");
    const response = await http.get(`${TEAM_ENDPOINTS.TEAM}/${id}`);
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

export async function getTeamsByUserId() {
  try {
    console.log("getTeamsByUserId");

    if (accessToken) {
      const response = await http.get(TEAM_ENDPOINTS.TEAM);

      if (response.status === 200) {
        return response.data.data;
      }
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}
