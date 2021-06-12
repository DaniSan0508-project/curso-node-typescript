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
    try{
        const newsId = await knex('locations').insert(location);
        const locationId = newsId[0];

        const locationItens = items
            .map((item_id: number)=>{
                return {
                    item_id,
                    location_id: locationId
                }
            })
        
        

        await knex('location_items').insert(locationItens)

        return res.json({
            id: locationId,
            ...location
        })
    }catch(error){
        console.log(error)
    }
  

})

export default locationsRoutes;