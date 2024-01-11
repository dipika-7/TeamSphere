import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constants/statusCode";
import UserModel from "../models/userModel";
import { verifyToken } from "../helpers/tokenHelper";
import UnAuthorizedError from "../errors/unAuthorizedError";
import { JwtPayload } from "jsonwebtoken";
import UnauthenticatedError from "../errors/unAuthenticatedError";

/**
 * Authentication middleware to verify JWT token and populate req.user with user information.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for passing control to the next middleware/route.
 */
export const Auth = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  if (req.headers["authorization"]) {
    try {
      const payload: any = await verifyToken(
        req.headers["authorization"].split(" ")[1]
      );

      if (!payload) {
        throw new UnAuthorizedError("Invalid token");
      }

      if (payload.tokenType == "refreshToken") {
        throw new UnAuthorizedError("Invalid token type");
      }

      delete payload.tokenType;
      req.user = payload;
      next();
    } catch (e) {
      next(new UnAuthorizedError((e as Error).message));
    }
  } else {
    next(new UnAuthorizedError("Authorization headers required"));
  }
};
