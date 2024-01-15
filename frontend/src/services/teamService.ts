import { IPartialTeam } from "../interfaces/team";
import { http } from "./httpService";
import { AxiosError } from "axios";

import { showToastMessage } from "../utils/responseUtil";
import { TEAM_ENDPOINTS, USER_TEAM_ENDPOINTS } from "../constants/endpoint";

export async function createTeam(team: IPartialTeam) {
  try {
    const response = await http.post(TEAM_ENDPOINTS.TEAM, team);

    if (response.status === 200) {
      showToastMessage("success", response.data.message);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getTeamById(id: string) {
  try {
    const response = await http.get(`${TEAM_ENDPOINTS.TEAM}/${id}`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getTeamsByUserId() {
  try {
    const response = await http.get(TEAM_ENDPOINTS.TEAM);

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function getUserTeamByTeamId(teamId: string) {
  try {
    const response = await http.get(
      `${USER_TEAM_ENDPOINTS.USER_TEAM_BY_TEAM_ID}/${teamId}`
    );

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function addUserInTeam(data: { userId: string; teamId: string }) {
  try {
    const response = await http.post(USER_TEAM_ENDPOINTS.USER_TEAM, data);
    if (response.status === 200) {
      showToastMessage("success", response.data.message);
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function checkTeamCreateByUser(teamId: string) {
  try {
    const response = await http.get(
      `${TEAM_ENDPOINTS.USER_CHECK_TEAM}/${teamId}`
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function getTeamMemberByTeamId(teamId: string) {
  try {
    const response = await http.get(
      `${USER_TEAM_ENDPOINTS.TEAM_MEMBER_BY_TEAM_ID}/${teamId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}
