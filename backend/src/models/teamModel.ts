import BaseModel from "./baseModel";
import { ICreateTeam, IUpdateTeam } from "../interfaces/teamInterface";

export default class TeamModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "t.id",
        name: "name",
        description: "description",
        createdBy: "users.username",
      })
      .from("teams as t")
      .join("users", "t.createdBy", "=", "users.id");
  }

  static async getById(id: string) {
    return this.queryBuilder()
      .select({
        id: "t.id",
        name: "name",
        description: "description",
        createdBy: "users.username",
      })
      .from("teams as t")
      .join("users", "t.createdBy", "=", "users.id")
      .where({ "t.id": id, "t.isDeleted": false })
      .first();
  }

  static async getByUserId(userId: string) {
    return this.queryBuilder()
      .select({
        id: "t.id",
        name: "name",
        description: "description",
        createdBy: "users.username",
      })
      .from("teams as t")
      .join("users", "t.createdBy", "=", "users.id")
      .where({ "t.createdBy": userId, "t.isDeleted": false });
  }

  static async create(team: ICreateTeam) {
    const user = this.queryBuilder().insert(team).returning("*").table("teams");
    return user;
  }

  static async update(id: string, team: IUpdateTeam) {
    return this.queryBuilder()
      .update(team)
      .table("teams")
      .where({ id })
      .returning("*");
  }

  static async delete(id: string) {
    return this.queryBuilder().table("teams").where({ id }).del();
  }
}
