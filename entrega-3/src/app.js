import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/products.routes.js';
//import cartsRouter from './routes/carts.routes.js';
import viewRouter from './routes/views.routes.js'
import handlebars from "express-handlebars"

const PORT = process.env.PORT || 3000;
const USER_DB = process.env.USER_DB
const PASWORD_DB = process.env.PASWORD_DB

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")
app.use('/api/products/', productRouter);
//app.use('/api/carts/', cartsRouter);
app.use('/', viewRouter);

mongoose.connect(`mongodb+srv://${USER_DB}:${PASWORD_DB}@cluster0.ojdfdmt.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>console.log('Conexion a base de datos'))
.catch(err=>console.log(err))

app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
});