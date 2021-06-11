import { Router } from 'express';
import knex from '../database/connection';

const itemsRoutes = Router();


itemsRoutes.get("/",async (req,res)=>{
    const items = await knex('items').select('*')

    const serializedItems = items.map(items => {
        return {
            id: items.id,
            title: items.title,
            image: `http://localhost:3333/uploads/${items.image}`
        }
    })
    return res.json(serializedItems)
})

export default itemsRoutes;