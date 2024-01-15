import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constants/statusCode";
import * as listService from "../services/listService";
import NotFoundError from "../errors/notFoundError";

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    if (!data.teamId) {
      throw new NotFoundError("Team Not Found");
    }

    const result = await listService.createList(data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully created",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getListDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("List Not Found");
    }

    const result = await listService.getListById(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got list detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getListByTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.id;

    const result = await listService.getListByTeamId(teamId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got list detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      throw new NotFoundError("List Not Found");
    }

    const result = await listService.updateList(id, data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully updated",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("List Not Found");
    }

    await listService.deleteList(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully removed",
    });
  } catch (e) {
    next(e);
  }
};
