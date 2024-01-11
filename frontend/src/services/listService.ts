import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { AxiosError } from "axios";
import { headers } from "../utils/authHeaderUtil";

export async function getListByTeamId(teamId: string) {
  try {
    const response = await http.get(`/lists/team/${teamId}`, { headers });

    console.log("List get");
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
