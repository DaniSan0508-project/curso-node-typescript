import express from 'express';
import routes from './routes/routes';
import path from 'path';

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json())
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname,'..','uploads')))


app.listen(PORT,()=>{
    console.log(`Server run in port ${PORT} `);
});