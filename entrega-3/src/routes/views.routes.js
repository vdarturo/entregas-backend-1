import { PORT } from '../common/conts.js'
import { Router } from 'express';

const viewRouter = Router()

viewRouter.get('/', async (req, res) => {
    try {
        const { limit, page } = req.query;
        const result = await fetch(`http://localhost:${PORT}/api/products?limit=${limit}&page=${page}`);
        const products = await result.json();
        res.render("index", {products, port: PORT});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener productos'})
    }
});

viewRouter.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await fetch(`http://localhost:${PORT}/api/products/${id}`);
        const product = await result.json();
        res.render("detail", {product, port: PORT});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener el detalle del producto'})
    }
});

viewRouter.get('/carts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await fetch(`http://localhost:${PORT}/api/carts/${id}`);
        const cart = await result.json();
        res.render("cart", {cart, port: PORT});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener el detalle del carrito de compras'})
    }
});

export default viewRouter;