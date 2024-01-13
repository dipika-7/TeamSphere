import InternalServerError from "../errors/internalServerError";
import NotFoundError from "../errors/notFoundError";
import { IUpdateUser } from "../interfaces/userInterface";
import UserModel from "../models/userModel";

export const getUserById = async (id: string) => {
  const userDetail = await UserModel.getById(id);
  if (!userDetail) {
    throw new NotFoundError("Not Found");
  }

  return userDetail;
};

export const getUserToAdd = async (userId: string) => {
  const userDetail = await UserModel.listOfUsers(userId);
  if (!userDetail) {
    throw new NotFoundError("Not Found");
  }

  return userDetail;
};

export const getUserByUsername = async (username: string) => {
  const userDetail = await UserModel.getByUsername(username);
  if (!userDetail) {
    throw new NotFoundError("Not Found");
  }

  return userDetail;
};

export const updateUserProfile = async (id: string, data: IUpdateUser) => {
  const userDetail = await getUserById(id);

  const updateUser = await UserModel.update(id, data);
  if (!updateUser) {
    throw new InternalServerError("Fail to update");
  }

  return updateUser;
};

export const deleteUser = async (id: string) => {
  const userDetail = await getUserById(id);
  const updateUser = await UserModel.update(id, { isDeleted: true });
  if (!updateUser) {
    throw new InternalServerError("Fail to remove");
  }

  return userDetail;
};
