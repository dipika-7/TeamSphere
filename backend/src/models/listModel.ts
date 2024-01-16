import BaseModel from "./baseModel";
import { ICreateList, IUpdateList } from "../interfaces/listInterface";
import { LIST } from "../constants/database";

export default class ListModel extends BaseModel {
  static async getById(id: string) {
    const query = this.queryBuilder()
      .select({
        id: "l.id",
        title: "title",
        order: "order",
        teamId: "t.name",
      })
      .from("lists as l")
      .join("teams as t", "l.teamId", "=", "t.id")
      .where({ "l.id": id, "l.isDeleted": false })
      .first();
    return query;
  }

  static async getByTeamId(teamId: string) {
    return this.queryBuilder()
      .select({
        id: "l.id",
        title: "title",
        order: "order",
        teamId: "t.name",
        createdBy: "u.username",
      })
      .from("lists as l")
      .join("teams as t", "l.teamId", "=", "t.id")
      .join("users as u", "t.createdBy", "=", "u.id")
      .where({ "l.teamId": teamId, "l.isDeleted": false })
      .orderBy("order", "asc");
  }

  static async create(list: ICreateList) {
    const user = this.queryBuilder().insert(list).returning("*").table(LIST);
    return user;
  }

  static async update(id: string, list: IUpdateList) {
    return this.queryBuilder()
      .update(list)
      .table(LIST)
      .where({ id })
      .returning("*");
  }

  static async delete(id: string) {
    return this.queryBuilder().table(LIST).where({ id }).del();
  }
}
