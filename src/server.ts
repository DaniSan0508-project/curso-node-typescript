import express from 'express';
import routes from './routes/routes';
const PORT = process.env.PORT || 3333;

const app = express();
app.use(routes);



app.listen(PORT,()=>{
    console.log(`Server run in port ${PORT} `);
});