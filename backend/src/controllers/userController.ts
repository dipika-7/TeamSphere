import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { GLOBALVARS } from "../constants/statusCode";
import * as userService from "../services/userService";
import NotFoundError from "../errors/notFoundError";
import UnAuthorizedError from "../errors/unAuthorizedError";

export const getUserProfile = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.user?.id;
    if (!id) {
      throw new NotFoundError("User Not Found");
    }

    const result = await userService.getUserById(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got user profile",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getListOfUsersToAdd = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.teamId;
    const userId = req?.user?.id;
    if (!userId) {
      throw new NotFoundError("User Not Found");
    }

    const result = await userService.getUserToAdd(userId, teamId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got user list to add in team",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const checkTokenvalid = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnAuthorizedError("User Not Found");
  }
};

export const getUserByUsername = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    if (!username) {
      throw new NotFoundError("User Not Found");
    }

    const result = await userService.getUserByUsername(username);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got user profile",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.user?.id;
    const data = req.body;

    if (!id) {
      throw new NotFoundError("User Not Found");
    }

    const result = await userService.updateUserProfile(id, data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully updated",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.user?.id;
    if (!id) {
      throw new NotFoundError("User Not Found");
    }

    const result = await userService.deleteUser(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully removed",
    });
  } catch (e) {
    next(e);
  }
};
