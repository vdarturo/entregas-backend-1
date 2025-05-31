import { PORT, USER_DB, PASWORD_DB } from './common/conts.js'
import express from 'express';
import mongoose from 'mongoose';
import {dirname} from "path"
import { fileURLToPath } from "url"
import handlebars from 'express-handlebars';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewRouter from './routes/views.routes.js';



const __dirname=dirname(fileURLToPath(import.meta.url))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);
app.use('/', viewRouter);

mongoose.connect(`mongodb+srv://${USER_DB}:${PASWORD_DB}@cluster0.ojdfdmt.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>console.log('Conexion a base de datos'))
.catch(err=>console.log(err))

app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
});