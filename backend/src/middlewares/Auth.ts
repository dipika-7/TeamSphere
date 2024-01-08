import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constants/statusCode";
import UserModel from "../models/userModel";
import { verifyToken } from "../helpers/tokenHelper";

/**
 * Authentication middleware to verify JWT token and populate req.user with user information.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for passing control to the next middleware/route.
 */
export const Auth = async (req: any, res: Response, next: NextFunction) => {
  if (req.headers["authorization"]) {
    const payload: any = await verifyToken(
      req.headers["authorization"].split(" ")[1]
    );

    if (!payload || payload.tokenType == "refreshToken") {
      return res.json({
        status: GLOBALVARS.errorStatusCode,
        message: "Invalid token",
      });
    } else {
      delete payload.tokenType;
      req.user = payload;
      console.log(req.user);
      next();
    }
  } else {
    return res.json({
      status: GLOBALVARS.errorStatusCode,
      message: "Authorization headers require",
    });
  }
};
