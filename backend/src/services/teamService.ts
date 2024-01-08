import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import { ICreateTeam, IUpdateTeam } from "../interfaces/teamInterface";
import TeamModel from "../models/teamModel";

export const createTeam = async (data: ICreateTeam) => {
  const newTeam = await TeamModel.create(data);
  if (!newTeam) {
    throw new InternalServerError("Fail to update");
  }
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

export const updateTeamProfile = async (id: string, data: IUpdateTeam) => {
  const teamDetail = await getTeamById(id);

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

  return teamDetail;
};