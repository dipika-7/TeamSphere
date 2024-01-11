import { IPartialTeam } from "../interfaces/team";
import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { AxiosError } from "axios";
import { headers } from "../utils/authHeaderUtil";

export async function createTeam(team: IPartialTeam) {
  try {
    const response = await http.post("/teams/", team, { headers });

    console.log("Team created", response, response.status);
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
    const response = await http.get(`/teams/${id}`, { headers });

    console.log("Team get");
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
    const response = await http.get("/teams", { headers });

    console.log("Team get by user id");
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
