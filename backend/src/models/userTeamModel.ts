import BaseModel from "./baseModel";
import {
  ICreateUserTeam,
  IUpdateUserTeam,
} from "../interfaces/userTeamInterface";

export default class UserTeamModel extends BaseModel {
  static async getById(id: string) {
    return this.queryBuilder()
      .select({
        id: "ut.id",
        teamId: "t.name",
        userId: "u.username",
      })
      .from("user_team as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where({ "ut.id": id, "ut.isDeleted": false })
      .first();
  }

  static async getByUserId(userId: string) {
    return this.queryBuilder()
      .select({
        id: "ut.id",
        teamId: "t.name",
        userId: "u.username",
      })
      .from("user_team as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where({ "ut.userId": userId, "ut.isDeleted": false });
  }

  static async getByTeamId(userId: string, teamId: string) {
    return this.queryBuilder()
      .select({
        id: "ut.id",
        teamId: "t.name",
        userId: "u.username",
      })
      .from("user_team as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where("ut.userId", "<>", userId)
      .where({
        "ut.teamId": teamId,
        "ut.isDeleted": false,
      });
  }

  static async getByUserIdAndTeamId(userId: string, teamId: string) {
    return this.queryBuilder()
      .select({
        id: "ut.id",
        teamId: "t.name",
        userId: "u.username",
      })
      .from("user_team as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where({
        "ut.userId": userId,
        "ut.teamId": teamId,
        "ut.isDeleted": false,
      })
      .first();
  }

  static async create(team: ICreateUserTeam) {
    return this.queryBuilder().insert(team).table("user_team").returning("*");
  }

  static async update(id: string, team: IUpdateUserTeam) {
    return this.queryBuilder().update(team).table("user_team").where({ id });
  }

  static async delete(id: string) {
    return this.queryBuilder().table("user_team").where({ id }).del();
  }
}
