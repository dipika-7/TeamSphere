import jwt from "jsonwebtoken";

import config from "../config";
import TokenModel from "../models/tokenModel";

/**
 * Generates a JWT token with the provided data and expiration time.
 * @param data - The data to be included in the token.
 * @param expiresIn - The expiration time for the token.
 * @returns A JWT token.
 */
export const generateToken = async (
  data: { id: string; tokenType: string },
  tokenSecret: string,
  expiresIn: string
) => {
  const token = jwt.sign(data, tokenSecret!, {
    expiresIn,
  });
  if (data.tokenType !== "accessToken") {
    const tokenDetail = await TokenModel.getByUserId(data.id);
    if (tokenDetail) {
      const updateToken = await TokenModel.update(tokenDetail.id, {
        token,
        tokenType: data.tokenType,
        userId: data.id,
      });
    } else {
      const saveToken = await TokenModel.create({
        token,
        tokenType: data.tokenType,
        userId: data.id,
      });
    }
  }
  return token;
};

/**
 * Verifies a JWT token and returns its decoded payload.
 * @param token - The JWT token to be verified.
 * @returns The decoded payload if the token is valid, otherwise false.
 */
export const verifyToken = async (
  token: string,
  tokenType: string = "accessToken"
) => {
  const tokenSecret =
    tokenType === "refreshToken"
      ? config.jwt.refreshTokenSecret
      : config.jwt.accessTokenSecret;
  const tokenStatus = jwt.verify(token, tokenSecret!, (err, decoded) => {
    if (err) {
      console.log({ err });
      return false;
    } else {
      return decoded;
    }
  });
  return tokenStatus;
};
