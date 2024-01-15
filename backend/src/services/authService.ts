import config from "../config";
import UserModel from "../models/userModel";
import { ISignUp, ILogin, IPassword } from "../interfaces/userInterface";
import { generateToken, verifyToken } from "../helpers/tokenHelper";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";
import TokenModel from "../models/tokenModel";
import UnAuthorizedError from "../errors/unAuthorizedError";
import { JwtPayload } from "../interfaces/jwtInterface";

/**
 * Signs up a new user by checking if the email is unique, hashing the password, and adding the user to the database.
 * @param body - The user details for signup.
 * @returns A promise that resolves to true if signup is successful, false otherwise.
 */
export const signup = async (body: ISignUp) => {
  const userEmailExists = await UserModel.getByEmail(body.email);

  if (userEmailExists) {
    throw new BadRequestError(`User with email: ${body.email} already exists`);
  }

  const hashedPassword = await hashPassword(body.password);

  await UserModel.create({
    ...body,
    password: hashedPassword,
  });

  return {
    message: "User signed up successfully",
  };
};

/**
 * Logs in a user by verifying the email and password, generating access and refresh tokens.
 * @param body - The login credentials.
 * @returns A promise that resolves to an object with access token and refresh token if successful.
 */
export const login = async (body: ILogin) => {
  const user = await UserModel.getByEmail(body.email);

  if (!user) {
    throw new BadRequestError("Invalid Email or Password");
  }

  const passwordMatch = await comparePassword(body.password, user.password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid Email or Password");
  }

  const accessToken = await generateToken(
    { id: user.id, tokenType: "accessToken" },
    config.jwt.accessTokenSecret,
    config.jwt.accessTokenExpiresIn
  );

  const refreshToken = await generateToken(
    { id: user.id, tokenType: "refreshToken" },
    config.jwt.refreshTokenSecret,
    config.jwt.refreshTokenExpiresIn
  );

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  return user;
};

/**
 * Generates a new access and refresh token pair using a valid refresh token.
 * @param token - The refresh token to use for generating new tokens.
 * @returns A promise that resolves to an object with new access and refresh tokens and a status message.
 */
export const generateNewAccessToken = async (token: string) => {
  const tokenDetail = await TokenModel.getByToken(token);

  if (!tokenDetail) {
    throw new UnAuthorizedError("Invalid Token");
  }

  const payload = (await verifyToken(
    token,
    tokenDetail.tokenType
  )) as unknown as JwtPayload;

  if (!payload || payload.tokenType !== "refreshToken") {
    throw new UnAuthorizedError("Invalid Token");
  }

  const userDetail = await UserModel.getById(payload.id);
  if (!userDetail) {
    throw new NotFoundError("Invalid Token");
  }
  const accessToken = await generateToken(
    {
      id: payload.id,
      tokenType: "accessToken",
    },
    config.jwt.accessTokenSecret,
    config.jwt.accessTokenExpiresIn
  );

  const refreshToken = await generateToken(
    {
      id: payload.id,
      tokenType: "refreshToken",
    },
    config.jwt.refreshTokenSecret,
    config.jwt.refreshTokenExpiresIn
  );

  await TokenModel.update(tokenDetail.id, {
    token: refreshToken,
    tokenType: "refreshToken",
    userId: payload.id,
  });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const changePassword = async (userId: string, data: IPassword) => {
  const { oldPassword, newPassword } = data;
  const userDetail = await UserModel.getByIdWithPassword(userId);
  if (!userDetail) {
    throw new NotFoundError("User Not Found");
  }

  const isMatched = await comparePassword(oldPassword, userDetail.password);
  if (!isMatched) {
    throw new BadRequestError("Old password does not match");
  }

  userDetail.password = await hashPassword(newPassword);
  console.log(userDetail);
  await UserModel.update(userDetail.id, userDetail);
  // delete userDetail.password;
  return userDetail;
};

/**
 * Logs out a user by clearing the access and refresh tokens.
 * @param refreshToken - The refresh token to identify the user.
 * @returns A promise that resolves to the updated user or false if the user is not found.
 */
export const logout = async (userId: string, refreshToken: string) => {
  const removeToken = await TokenModel.deleteByToken(refreshToken);
  // const user = await UserModel.getById(userId);
  // if (user) {
  //   user.accessToken = "";
  //   user.refreshToken = "";
  //   const updateUser = await UserModel.update(user.id, user);
  // }
  return removeToken;
};
