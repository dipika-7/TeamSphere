import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { AxiosError } from "axios";
import { headers } from "../utils/authHeaderUtil";
import { IPartialCard } from "../interfaces/card";

export async function getCardByListId(listId: string) {
  try {
    const response = await http.get(`/cards/list/${listId}`, { headers });

    console.log("Card get");
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

export async function createCard(card: IPartialCard) {
  try {
    const response = await http.post("/cards/", card, { headers });

    console.log("Card created", response, response.status);
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
