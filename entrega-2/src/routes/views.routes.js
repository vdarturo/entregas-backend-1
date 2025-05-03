import { Router } from "express";
import PM from '../domain/ProductManager.js';

const router = Router();
const ProductManager = new PM('./products.json');

router.get('/realtimeproducts', (req, res) => {
    res.render("realTimeProducts")
})

router.get('/', async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render("home", {products});
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
})

export default router