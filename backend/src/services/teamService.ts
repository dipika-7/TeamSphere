import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import { ICreateTeam, IUpdateTeam } from "../interfaces/teamInterface";
import TeamModel from "../models/teamModel";
import * as UserTeamService from "../services/userTeamService";
import * as ListService from "../services/listService";
import * as CardService from "../services/cardService";

export const createTeam = async (data: ICreateTeam) => {
  const newTeam = await TeamModel.create(data);
  if (!newTeam) {
    throw new InternalServerError("Fail to update");
  }
  await UserTeamService.createUserTeam({
    userId: newTeam[0].createdBy,
    teamId: newTeam[0].id,
  });

  await ListService.createListGroup(newTeam[0].id);
  return newTeam[0];
};

export const getTeamById = async (id: string) => {
  const teamDetail = await TeamModel.getById(id);
  if (!teamDetail) {
    throw new NotFoundError("Not Found");
  }

  return teamDetail;
};

export const getTeamByUserId = async (userId: string) => {
  const teamDetail = await TeamModel.getByUserId(userId);
  if (!teamDetail) {
    throw new NotFoundError("Not Found");
  }

  return teamDetail;
};

export const checkTeamCreateByUser = async (userId: string, teamId: string) => {
  const teamDetail = await TeamModel.checkTeamCreatedBy(userId, teamId);
  if (teamDetail.length <= 0) {
    return false;
  } else {
    return true;
  }
};

export const updateTeamProfile = async (id: string, data: IUpdateTeam) => {
  await getTeamById(id);

  const updateTeam = await TeamModel.update(id, data);
  if (!updateTeam) {
    throw new InternalServerError("Fail to update");
  }

  return updateTeam;
};

export const deleteTeam = async (id: string) => {
  const teamDetail = await getTeamById(id);
  const updateTeam = await TeamModel.update(id, { isDeleted: true });
  if (!updateTeam) {
    throw new InternalServerError("Fail to remove");
  }

  const listsOfTeam = await ListService.getListByTeamId(id);
  console.log("listsOfTeam", listsOfTeam);
  listsOfTeam.forEach(async (list) => {
    console.log("list delete", list.id);
    await ListService.deleteList(list.id);

    const cardsOfList = await CardService.getCardByListId(list.id);
    cardsOfList.forEach(async (card) => {
      await CardService.deleteCard(card.id);
    });
  });
  return teamDetail;
};
