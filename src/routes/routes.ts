import { Router } from 'express';
import itemsRouter from './items.routes';


const routes = Router();

routes.get("/",(req,res)=>{res.send('ok')})
routes.use("/items",itemsRouter);

export default routes;