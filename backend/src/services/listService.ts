import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import { ICreateList, IUpdateList } from "../interfaces/listInterface";
import ListModel from "../models/listModel";

export const createListGroup = async (teamId: string) => {
  const newFirstList = await createList({ title: "To Do", teamId, order: 1 });
  const newSecondList = await createList({
    title: "Pending",
    teamId,
    order: 2,
  });
  const newThirdList = await createList({
    title: "Completed",
    teamId,
    order: 3,
  });
  return { newFirstList, newSecondList, newThirdList };
};

export const createList = async (data: ICreateList) => {
  const getLists = await getListByTeamId(data.teamId);
  const order = getLists.length >= 1 ? getLists[getLists.length - 1].order : 1;
  data.order = order + 1;
  const newList = await ListModel.create(data);
  if (!newList) {
    throw new InternalServerError("Fail to update");
  }
  return newList[0];
};

export const getListById = async (id: string) => {
  const listDetail = await ListModel.getById(id);
  if (!listDetail) {
    throw new NotFoundError("Not Found");
  }

  return listDetail;
};

export const getListByTeamId = async (teamId: string) => {
  const listDetail = await ListModel.getByTeamId(teamId);
  if (listDetail.length < 0) {
    throw new NotFoundError("Not Found");
  }

  return listDetail;
};

export const updateList = async (id: string, data: IUpdateList) => {
  await getListById(id);

  const updateList = await ListModel.update(id, data);
  if (!updateList) {
    throw new InternalServerError("Fail to update");
  }

  return updateList;
};

export const deleteList = async (id: string) => {
  const listDetail = await getListById(id);
  const updateList = await ListModel.update(id, { isDeleted: true });
  if (!updateList) {
    throw new InternalServerError("Fail to remove");
  }

  return listDetail;
};
