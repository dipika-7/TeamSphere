import BaseModel from "./baseModel";
import { IUser, ISignUp, IUpdateUser } from "../interfaces/userInterface";

export default class UserModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        designation: "designation",
      })
      .from("users");
  }

  static async listOfUsers(userId: string) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        designation: "designation",
      })
      .from("users")
      .where("id", "<>", userId);
  }

  static async getById(id: string) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        designation: "designation",
      })
      .from("users")
      .where({ id, isDeleted: false })
      .first();
  }

  static async getByIdWithPassword(id: string) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
        designation: "designation",
      })
      .from("users")
      .where({ id, isDeleted: false })
      .first();
  }

  static async getByEmail(email: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
        designation: "designation",
      })
      .from("users")
      .where({ email, isDeleted: false });

    return user?.[0];
  }

  static async getByUsername(username: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
        designation: "designation",
      })
      .from("users")
      .where({ username, isDeleted: false });

    return user?.[0];
  }

  static async create(user: ISignUp) {
    return this.queryBuilder().insert(user).table("users");
  }

  static async update(id: string, user: IUpdateUser) {
    return this.queryBuilder().update(user).table("users").where({ id });
  }

  static async delete(id: string) {
    return this.queryBuilder().table("users").where({ id }).del();
  }
}
