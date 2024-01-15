import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import { ICreateCard, IUpdateCard } from "../interfaces/cardInterface";
import CardModel from "../models/cardModel";

export const createCard = async (data: ICreateCard) => {
  const getCard = await CardModel.getByListId(data.listId);

  if (getCard.length <= 0) {
    data.priority = 1;
  } else {
    data.priority = getCard.length + 1;
  }

  const newCard = await CardModel.create(data);
  if (!newCard) {
    throw new InternalServerError("Fail to create");
  }
  return newCard[0];
};

export const getCardById = async (id: string) => {
  const cardDetail = await CardModel.getById(id);
  if (!cardDetail) {
    throw new NotFoundError("Not Found");
  }

  return cardDetail;
};

export const getCardByListId = async (listId: string) => {
  const cardDetail = await CardModel.getByListId(listId);
  if (!cardDetail) {
    throw new NotFoundError("Not Found");
  }

  return cardDetail;
};

export const getSearchByAssigneeId = async (
  userId: string,
  searchTerm: string
) => {
  const cardDetail = await CardModel.getSearchByAssigneeId(userId, searchTerm);
  if (!cardDetail) {
    throw new NotFoundError("Not Found");
  }

  return cardDetail;
};

export const getByAssigneeId = async (userId: string, teamId: string) => {
  const cardDetail = await CardModel.getByAssigneeId(userId, teamId);
  if (!cardDetail) {
    throw new NotFoundError("Not Found");
  }

  return cardDetail;
};

export const updateCard = async (id: string, data: IUpdateCard) => {
  await getCardById(id);

  const updateCard = await CardModel.update(id, data);
  if (!updateCard) {
    throw new InternalServerError("Fail to update");
  }

  return updateCard;
};

export const updateCardStatus = async (id: string) => {
  const cardDetail = await getCardById(id);
  const status = cardDetail.status === "incomplete" ? "complete" : "incomplete";
  const updateCard = await CardModel.update(id, { status });
  if (!updateCard) {
    throw new InternalServerError("Fail to update");
  }

  return updateCard;
};

export const deleteCard = async (id: string) => {
  const cardDetail = await getCardById(id);
  const updateCard = await CardModel.update(id, { isDeleted: true });
  if (!updateCard) {
    throw new InternalServerError("Fail to remove");
  }

  return cardDetail;
};
