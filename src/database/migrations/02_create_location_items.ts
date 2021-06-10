import { Knex } from 'knex';

// tabla que cria o relacionamento entre as outras

export async function up(knex: Knex){
    return knex.schema.createTable('location_items',table =>{
        table.increments('id').primary();
        table.string('location_id')
            .notNullable()
            .references('id')
            .inTable('locations')
        table.string('item_id')
            .notNullable()
            .references('id')
            .inTable('items')
    });
}

export async function down(knex:Knex){
    return knex.schema.dropTable('locations')
}