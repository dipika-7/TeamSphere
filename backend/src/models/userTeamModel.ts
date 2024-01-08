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
        teamId: "t.team",
        userId: "u.username",
      })
      .from("user_teams as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where({ "ut.id": id, "ut.isDeleted": false })
      .first();
  }

  static async getByUserId(userId: string) {
    return this.queryBuilder()
      .select({
        id: "ut.id",
        teamId: "t.team",
        userId: "u.username",
      })
      .from("user_teams as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where({ "ut.userId": userId, "ut.isDeleted": false });
  }

  static async getByTeamId(teamId: string) {
    return this.queryBuilder()
      .select({
        id: "ut.id",
        teamId: "t.team",
        userId: "u.username",
      })
      .from("user_teams as ut")
      .join("users as u", "ut.userId", "=", "u.id")
      .join("teams as t", "ut.teamId", "=", "t.id")
      .where({ "ut.teamId": teamId, "ut.isDeleted": false });
  }

  static async create(team: ICreateUserTeam) {
    return this.queryBuilder().insert(team).table("user_teams");
  }

  static async update(id: string, team: IUpdateUserTeam) {
    return this.queryBuilder().update(team).table("user_teams").where({ id });
  }

  static async delete(id: string) {
    return this.queryBuilder().table("user_teams").where({ id }).del();
  }
}
