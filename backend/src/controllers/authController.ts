import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { GLOBALVARS } from "../constants/statusCode";
import * as authService from "../services/authService";
import { ISignUp } from "../interfaces/userInterface";
import NotFoundError from "../errors/notFoundError";
import { sendMail } from "../helpers/mailHelper";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ISignUp = req.body;

    await authService.signup(body);

    return res.json({
      status: GLOBALVARS.successStatusCode,
      message: "Signed up successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const data = await authService.login(body);

    sendMail({
      email: "dipikasuwal77@gmail.com",
      subject: "Added to Team",
      username: "dipika",
      teamName: "Team Collaborate",
      teamDescription: "Team to collaborate and perform better performance",
    });
    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Login successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generates a new refresh token.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const generateNewAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.body.refreshToken;
    const result = await authService.generateNewAccessToken(refreshToken);

    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Login Successfully",
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const userId = req?.user?.id;
  if (!userId) {
    throw new NotFoundError("User Not Found");
  }
  try {
    const result = await authService.changePassword(userId, data);

    return res.status(GLOBALVARS.successStatusCode).json({
      message: "Password Changed Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user logout.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const logout = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.id;
    const data = req.body;
    if (data.refreshToken) {
      const resetToken = await authService.logout(userId, data.refreshToken);
    }
    res.status(GLOBALVARS.successStatusCode).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    next(error);
  }
};
