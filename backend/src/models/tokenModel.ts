import BaseModel from "./baseModel";
import { ICreateToken } from "../interfaces/tokenInterface";

export default class TokenModel extends BaseModel {
  static async getByToken(token: string) {
    return this.queryBuilder()
      .select({
        id: "id",
        token: "token",
        tokenType: "tokenType",
        userId: "userId",
      })
      .from("tokens")
      .where({ token })
      .first();
  }

  static async getByUserId(userId: string) {
    return this.queryBuilder()
      .select({
        id: "id",
        token: "token",
        tokenType: "tokenType",
        userId: "userId",
      })
      .from("tokens")
      .where({ userId })
      .first();
  }

  static async create(user: ICreateToken) {
    return this.queryBuilder().insert(user).table("tokens");
  }

  static async update(id: number, token: ICreateToken) {
    return this.queryBuilder().update(token).table("tokens").where({ id });
  }

  static async deleteByToken(token: string) {
    return this.queryBuilder().table("tokens").where({ token }).del();
  }

  static async delete(id: number) {
    return this.queryBuilder().table("tokens").where({ id }).del();
  }
}
