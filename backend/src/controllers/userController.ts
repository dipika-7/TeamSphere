import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { GLOBALVARS } from "../constants/statusCode";
import * as userService from "../services/userService";
import NotFoundError from "../errors/notFoundError";

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
