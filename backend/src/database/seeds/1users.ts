import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          username: "firstUser",
          email: "user1@test.com",
          password: "password",
          designation: "manager",
        },
        {
          username: "secondUser",
          email: "user2@test.com",
          password: "password",
          designation: "developer",
        },
      ]);
    });
}
