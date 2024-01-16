import BaseModel from "./baseModel";
import { ICreateCard, IUpdateCard } from "../interfaces/cardInterface";
import { CARD } from "../constants/database";

export default class CardModel extends BaseModel {
  static async getById(id: string) {
    return this.queryBuilder()
      .select({
        id: "c.id",
        title: "c.title",
        description: "description",
        status: "status",
        deadline: "deadline",
        priority: "priority",
        assignedTo: "u.username",
        listId: "l.id",
      })
      .from("cards as c")
      .join("lists as l", "l.id", "=", "c.listId")
      .join("users as u", "u.id", "=", "c.assignedTo")
      .where({ "c.id": id, "c.isDeleted": false })
      .first();
  }

  static async getByListId(listId: string) {
    return this.queryBuilder()
      .select({
        id: "c.id",
        title: "c.title",
        description: "description",
        status: "status",
        deadline: "deadline",
        priority: "priority",
        assignedTo: "u.username",
        listId: "l.id",
      })
      .from("cards as c")
      .join("lists as l", "l.id", "=", "c.listId")
      .join("users as u", "u.id", "=", "c.assignedTo")
      .where({ "c.listId": listId, "c.isDeleted": false })
      .orderBy("priority", "asc");
  }

  static async getSearchByAssigneeId(userId: string, searchTerm: string) {
    const query = this.queryBuilder()
      .select("cards.*")
      .from("cards")
      .join("lists", "cards.listId", "lists.id")
      .join("teams", "lists.teamId", "teams.id")
      .join("user_team", "teams.id", "user_team.teamId")
      .where("user_team.userId", userId)
      .andWhere(function () {
        this.where("cards.title", "ILIKE", `%${searchTerm}%`).orWhere(
          "cards.description",
          "ILIKE",
          `%${searchTerm}%`
        );
      });
    return query;
  }

  static async getByAssigneeId(userId: string, teamId: string) {
    return this.queryBuilder()
      .select("cards.*")
      .from("cards")
      .join("lists", "cards.listId", "=", "lists.id")
      .join("teams", "lists.teamId", "=", "teams.id")
      .join("user_team", "teams.id", "=", "user_team.teamId")
      .join("users", "cards.assignedTo", "=", "users.id")
      .where("users.id", userId)
      .andWhere("teams.id", teamId)
      .groupBy("cards.id");
  }

  static async create(card: ICreateCard) {
    const user = this.queryBuilder().insert(card).returning("*").table(CARD);
    return user;
  }

  static async update(id: string, card: IUpdateCard) {
    return this.queryBuilder()
      .update(card)
      .table(CARD)
      .where({ id })
      .returning("*");
  }

  static async delete(id: string) {
    return this.queryBuilder().table(CARD).where({ id }).del();
  }
}
