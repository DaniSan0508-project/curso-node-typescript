import { Router } from 'express';
import knex from '../database/connection';

const locationsRoutes = Router();


locationsRoutes.post("/",async (req,res)=>{
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = req.body;

    const location = {
        image:'fake-image.jpg',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    }
    
    const transaction = await knex.transaction();

    const newIds = await transaction('locations').insert(location);

    const location_id = newIds[0];

    const locationItems = items
        .map((item_id: number) => {
            const selectedItem = transaction('items').where('id', item_id).first();

            if (!selectedItem) {
                transaction.rollback();
                return res.status(400).json({ message: 'Item not found.' });
            }

            return {
                item_id,
                location_id
            }
        });

    await transaction('location_items').insert(locationItems);

    await transaction.commit();

    return res.json({
        id: location_id,
        ...location
    });
});
locationsRoutes.get("/:id",async (req,res)=>{
    const {id} = req.params;

    const location  = await knex('locations').where('id', id).first();

    if (!location) {
        return res.status(400).json({msg:"localização não localizada"})
    }

    const items = await knex("items")
        //verifica na tabela location_items pelos itens quais itens tem cadastrados
        .join("location_items", "items.id", "=", "location_items.item_id")
        //quando ele ira fazer a comparação ?, qnd o id do local pesquisado for igual a id digitado
        .where("location_items.location_id", id)
        //seleciona somente o titulo e retorna
        .select("items.title")

    return res.json({location, items});
})

locationsRoutes.get('/', async (request, response) => {
    const { city, uf, items } = request.query;

    if (city && uf && items) {
        const parsedItems: Number[] = String(items).split(',').map(item => Number(item.trim()));

        const locations = await knex('locations')
            .join('location_items', 'locations.id', '=', 'location_items.location_id')
            .whereIn('location_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('locations.*');

            return response.json(locations);
    } else {
        const locations = await knex('locations').select('*');

        return response.json(locations);
    }
});

export default locationsRoutes;