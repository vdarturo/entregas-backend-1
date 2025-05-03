import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import  path from 'path';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import PM from './domain/ProductManager.js';

const app = express();
const PORT = 8080;
const server = createServer(app);
const io = new Server(server);
const ProductManager = new PM('./products.json');

app.engine('handlebars', handlebars.engine());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(`${__dirname}./public`));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use('/', viewsRouter);

io.on("connection", async socket => {
    try{
        const products = await ProductManager.getProducts();
        socket.emit('show_products', products);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
});
  
server.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});