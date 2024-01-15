import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../helpers/tokenHelper";
import UnAuthorizedError from "../errors/unAuthorizedError";
import { JwtPayload } from "../interfaces/jwtInterface";

/**
 * Authentication middleware to verify JWT token and populate req.user with user information.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for passing control to the next middleware/route.
 */
export const Auth = async (
  req: Request & { user?: JwtPayload },
  _res: Response,
  next: NextFunction
) => {
  if (req.headers["authorization"]) {
    try {
      const payload = (await verifyToken(
        req.headers["authorization"].split(" ")[1]
      )) as unknown as JwtPayload;

      if (!payload) {
        throw new UnAuthorizedError("Invalid token");
      }

      if (payload.tokenType == "refreshToken") {
        throw new UnAuthorizedError("Invalid token type");
      }

      req.user = payload;
      next();
    } catch (e) {
      next(new UnAuthorizedError((e as Error).message));
    }
  } else {
    next(new UnAuthorizedError("Authorization headers required"));
  }
};
