import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(function () {
      return knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();

        table.string("username", 255).unique().notNullable();

        table.string("email", 255).unique().notNullable();

        table.string("password", 255).notNullable();

        table.string("designation", 255).notNullable();

        table.boolean("is_deleted").defaultTo(false).notNullable();

        table
          .timestamp("created_at")
          .notNullable()
          .defaultTo(knex.raw("now()"));

        table.timestamp("updated_at").nullable();
      });
    });
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
