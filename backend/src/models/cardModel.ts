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
        listId: "l.title",
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
        listId: "l.title",
      })
      .from("cards as c")
      .join("lists as l", "l.id", "=", "c.listId")
      .join("users as u", "u.id", "=", "c.assignedTo")
      .where({ "c.listId": listId, "c.isDeleted": false })
      .orderBy("priority", "asc");
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
