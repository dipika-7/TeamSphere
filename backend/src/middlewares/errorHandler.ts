// import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import UnauthenticatedError from "../errors/unAuthenticatedError";

import loggerWithNameSpace from "../utils/logger";
import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";
import ConflictError from "../errors/conflictError";
import { GLOBALVARS } from "../constants/statusCode";

const logger = loggerWithNameSpace("ErrorHandler");

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 */
export function notFoundError(_req: Request, res: Response) {
  return res.status(GLOBALVARS.notFound).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof BadRequestError) {
    return res.status(GLOBALVARS.badRequest).json({ message: error.message });
  }

  if (error instanceof UnauthenticatedError) {
    return res
      .status(GLOBALVARS.unauthenticated)
      .json({ message: error.message });
  }

  if (error instanceof NotFoundError) {
    return res.status(GLOBALVARS.notFound).json({ message: error.message });
  }

  if (error instanceof ConflictError) {
    return res.status(GLOBALVARS.conflict).json({ message: error.message });
  }

  return res
    .status(GLOBALVARS.internalServerError)
    .json({ message: error.message });
}
