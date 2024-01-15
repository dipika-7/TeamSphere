import { Knex } from "knex";
import { LIST, PEOPLE } from "../../constants/database";

const TABLE_NAME = "cards";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return (
    knex
      // eslint-disable-next-line quotes
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .then(function () {
        return knex.schema.createTable(TABLE_NAME, (table) => {
          table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();

          table.string("title", 255).notNullable();

          table.string("description", 255).nullable();

          table
            .enum("status", ["complete", "incomplete"])
            .defaultTo("incomplete");

          table.date("deadline").notNullable();

          table.integer("priority").unsigned().defaultTo(1).notNullable();

          table.uuid("list_id").notNullable().references("id").inTable(LIST);

          table.boolean("is_deleted").defaultTo(false).notNullable();

          table
            .uuid("assigned_to")
            .references("id")
            .inTable(PEOPLE)
            .notNullable();

          table
            .timestamp("created_at")
            .notNullable()
            .defaultTo(knex.raw("now()"));

          table.timestamp("updated_at").nullable();
        });
      })
  );
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
