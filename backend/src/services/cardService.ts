import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import { ICreateCard, IUpdateCard } from "../interfaces/cardInterface";
import CardModel from "../models/cardModel";

export const createCard = async (data: ICreateCard) => {
  const newCard = await CardModel.create(data);
  if (!newCard) {
    throw new InternalServerError("Fail to create");
  }
  return newCard[0];
};

export const getCardById = async (id: string) => {
  const cardDetail = await CardModel.getById(id);
  console.log(cardDetail);
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

export const updateCard = async (id: string, data: IUpdateCard) => {
  const cardDetail = await getCardById(id);

  const updateCard = await CardModel.update(id, data);
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
