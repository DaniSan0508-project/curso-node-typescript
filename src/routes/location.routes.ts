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
        uf
    } = req.body;

    const location = {
        image:'fake-image.jpg',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    }
    try{
        const newsId = await knex('locations').insert(location);
        
        console.log(newsId)
    }catch(error){
        console.log(error)
    }
  

})

export default locationsRoutes;