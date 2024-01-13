import BadRequestError from "../errors/badRequestError";
import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import {
  ICreateUserTeam,
  IUpdateUserTeam,
} from "../interfaces/userTeamInterface";
import UserTeamModel from "../models/userTeamModel";

export const createUserTeam = async (data: ICreateUserTeam) => {
  const checkAlreadyExists = await UserTeamModel.getByUserIdAndTeamId(
    data.userId,
    data.teamId
  );
  if (checkAlreadyExists) {
    throw new BadRequestError("User is already in team");
  }

  const newUserTeam = await UserTeamModel.create(data);
  if (!newUserTeam) {
    throw new InternalServerError("Fail to update");
  }
  return newUserTeam;
};

export const getUserTeamById = async (id: string) => {
  const userTeamDetail = await UserTeamModel.getById(id);
  if (!userTeamDetail) {
    throw new NotFoundError("Not Found");
  }

  return userTeamDetail;
};

export const getUserTeamByUserId = async (userId: string) => {
  const userTeamDetail = await UserTeamModel.getByUserId(userId);
  if (!userTeamDetail) {
    throw new NotFoundError("Not Found");
  }

  return userTeamDetail;
};

export const getUserTeamByTeamId = async (userId: string, teamId: string) => {
  const userTeamDetail = await UserTeamModel.getByTeamId(userId, teamId);
  if (!userTeamDetail) {
    throw new NotFoundError("Not Found");
  }

  return userTeamDetail;
};

export const getUserTeamByUserIdAndTeamId = async (
  userId: any,
  teamId: any
) => {
  const userTeamDetail = await UserTeamModel.getByUserIdAndTeamId(
    userId,
    teamId
  );
  if (!userTeamDetail) {
    throw new NotFoundError("Not Found");
  }

  return userTeamDetail;
};

export const updateUserTeam = async (id: string, data: IUpdateUserTeam) => {
  const userTeamDetail = await getUserTeamById(id);

  const updateUserTeam = await UserTeamModel.update(id, data);
  if (!updateUserTeam) {
    throw new InternalServerError("Fail to update");
  }

  return updateUserTeam;
};

export const deleteUserTeam = async (id: string) => {
  const userTeamDetail = await getUserTeamById(id);
  const updateUserTeam = await UserTeamModel.delete(id);
  if (!updateUserTeam) {
    throw new InternalServerError("Fail to remove");
  }

  return userTeamDetail;
};
