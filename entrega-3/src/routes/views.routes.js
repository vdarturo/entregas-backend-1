import { PORT } from '../common/conts.js'
import { Router } from 'express';

const viewRouter = Router()

viewRouter.get('/', async (req, res) => {
    try {
        const { limit, page } = req.query;
        const result = await fetch(`http://localhost:${PORT}/api/products?limit=${limit}&page=${page}`);
        const products = await result.json();
        res.render("index", {products});
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
        res.render("detail", {product});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener el detalle del producto'})
    }
});

viewRouter.get('/cart/:id', async (req, res) => {
    try {
        /*const { id } = req.params
        const result = await fetch(`http://localhost:${PORT}/api/cart/${id}`);
        const cart = await result.json();
        res.render("cart", {cart});*/
        res.render("cart");
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener el detalle del carrito de compras'})
    }
});

export default viewRouter;