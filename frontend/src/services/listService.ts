import { AxiosError } from "axios";

import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { LIST_ENDPOINTS } from "../constants/endpoint";

export async function getListByTeamId(teamId: string) {
  try {
    const response = await http.get(
      `${LIST_ENDPOINTS.LISTS_BY_TEAM}/${teamId}`
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
