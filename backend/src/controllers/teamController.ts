import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { GLOBALVARS } from "../constants/statusCode";
import * as teamService from "../services/teamService";
import NotFoundError from "../errors/notFoundError";

export const createTeam = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    data.createdBy = req?.user?.id;

    if (!data.createdBy) {
      throw new NotFoundError("User Not Found");
    }

    const result = await teamService.createTeam(data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully created",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getTeamDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("Team Not Found");
    }

    const result = await teamService.getTeamById(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got team detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getTeamsByUserId = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      throw new NotFoundError("Team Not Found");
    }

    const result = await teamService.getTeamByUserId(userId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got team detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const checkTeamCreateByUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.id;
    const teamId = req?.params?.id;
    if (!userId) {
      throw new NotFoundError("Not Found");
    }

    const result = await teamService.checkTeamCreateByUser(userId, teamId);
    if (result) {
      res.status(GLOBALVARS.successStatusCode).json({
        message: "You create this team",
      });
    } else {
      res.status(GLOBALVARS.errorStatusCode).json({
        message: "Created by others",
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      throw new NotFoundError("Team Not Found");
    }

    const result = await teamService.updateTeamProfile(id, data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully updated",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("Team Not Found");
    }

    const result = await teamService.deleteTeam(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully removed",
    });
  } catch (e) {
    next(e);
  }
};
