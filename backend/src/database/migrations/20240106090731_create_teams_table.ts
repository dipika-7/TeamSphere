import { Knex } from "knex";
import { PEOPLE } from "../../constants/database";

const TABLE_NAME = "teams";

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

          table.string("name", 255).notNullable();

          table.string("description", 255).nullable();

          table.boolean("is_deleted").defaultTo(false).notNullable();

          table
            .timestamp("created_at")
            .notNullable()
            .defaultTo(knex.raw("now()"));

          table
            .uuid("created_by")
            .notNullable()
            .references("id")
            .inTable(PEOPLE)
            .defaultTo(knex.raw("uuid_generate_v4()"))
            .onDelete("CASCADE");

          table.timestamp("updated_at").nullable();

          table
            .uuid("updated_by")
            .references("id")
            .inTable(PEOPLE)
            .nullable()
            .defaultTo(null)
            .onDelete("CASCADE");
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
