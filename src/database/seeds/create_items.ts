// usado para inserir direto valores , qnd ja vem inserido

import { Knex } from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        {title:"Papéis e Papelão", image:"papel.png"},
        {title:"Vidros e Lampadas", image:"vidros.png"}
    ])
    
}