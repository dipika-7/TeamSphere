import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constants/statusCode";
import * as cardService from "../services/cardService";
import NotFoundError from "../errors/notFoundError";
import { JwtPayload } from "../interfaces/jwtInterface";

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    if (!data.listId) {
      throw new NotFoundError("List Not Found");
    }

    const result = await cardService.createCard(data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully created",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getCardDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("Card Not Found");
    }

    const result = await cardService.getCardById(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got card detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getCardByListId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listId = req.params.id;

    const result = await cardService.getCardByListId(listId);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got card detail",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getCardSearch = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const user = req.user!;

    const result = await cardService.getSearchByAssigneeId(
      user.id,
      searchTerm as string
    );
    console.log(result);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getCardByAssigneeId = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.query.teamId || "";
    const userId = req.query.userId;

    console.log(userId, teamId);

    const result = await cardService.getByAssigneeId(
      userId as string,
      teamId as string
    );
    console.log(result);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully got",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      throw new NotFoundError("Card Not Found");
    }

    const result = await cardService.updateCard(id, data);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully updated",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateCardStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new NotFoundError("Card Not Found");
    }

    const result = await cardService.updateCardStatus(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully updated",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("Card Not Found");
    }

    await cardService.deleteCard(id);
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Successfully removed",
    });
  } catch (e) {
    next(e);
  }
};
