import { AxiosError } from "axios";

import { http } from "./httpService";
import { showToastMessage } from "../utils/responseUtil";
import { IPartialCard } from "../interfaces/card";
import { CARD_ENDPOINTS } from "../constants/endpoint";

export async function getCardByListId(listId: string) {
  try {
    const response = await http.get(
      `${CARD_ENDPOINTS.CARDS_BY_LISTID}/${listId}`
    );

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
    const response = await http.post(CARD_ENDPOINTS.CARDS, card);
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

export async function updateCard(cardId: string, card: IPartialCard) {
  try {
    const response = await http.put(`${CARD_ENDPOINTS.CARDS}/${cardId}`, card);
    if (response.status === 200) {
      // showToastMessage("success", response.data.message);
      return;
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}

export async function updateCardStatus(cardId: string) {
  try {
    const response = await http.put(`${CARD_ENDPOINTS.UPDATE_CARD}/${cardId}`);
    if (response.status === 200) {
      showToastMessage("success", response.data.message);
      return response.data.data;
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      showToastMessage("error", error.response?.data.message);
    }
  }
}
