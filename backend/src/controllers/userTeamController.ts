import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constants/statusCode";
import * as userTeamService from "../services/userTeamService";
import NotFoundError from "../errors/notFoundError";
import { JwtPayload } from "jsonwebtoken";

export const createUserTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    if (!data.teamId) {
      throw new NotFoundError("Team Not Found");
    }

    const result = await userTeamService.createUserTeam(data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully created",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserTeamDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("UserTeam Not Found");
    }

    const result = await userTeamService.getUserTeamById(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got userTeam detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserTeamByTeamId = async (
  //   req: Request & { user: JwtPayload },
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.id;
    const userId = req.user.id;
    const result = await userTeamService.getUserTeamByTeamId(userId, teamId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got userTeam detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserTeamByUserId = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.id;
    const result = await userTeamService.getUserTeamByUserId(userId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got userTeam detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserTeamByUserIdAndTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.query;
    const result = await userTeamService.getUserTeamByUserIdAndTeamId(
      data.userId,
      data.teamId
    );
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got userTeam detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getMembersByTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.id;
    console.log(teamId);
    const result = await userTeamService.getMembersByTeamId(teamId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got userTeam detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateUserTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      throw new NotFoundError("UserTeam Not Found");
    }

    const result = await userTeamService.updateUserTeam(id, data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully updated",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteUserTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("UserTeam Not Found");
    }

    const result = await userTeamService.deleteUserTeam(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully removed",
    });
  } catch (e) {
    next(e);
  }
};
