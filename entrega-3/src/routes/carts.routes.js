import { Router } from "express";
import CM from '../services/CartManager.js';

const router = Router();
const CartManager = new CM('./carts.json');

router.post('/', async(req,res)=>{
    try {
        const newCart = await CartManager.createCart(req.body);
        res.status(201).json({message:'Nuevo carrito de compras', cart: newCart})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.get('/:id', async (req,res)=>{
    const cartId = parseInt(req.params.id)

    try {
        const cart = await CartManager.getCartById(cartId);

        if(!cart){
            return res.status(404).json({error:'Carrito de compras no encontrado'})
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el carrito de compras'})
    }
});

router.post('/:cartId/product/:productId', async(req,res)=>{
    const productId = parseInt(req.params.productId);
    const cartId = parseInt(req.params.cartId);

    try {
        const product = await ProductManager.getProductById(productId);

        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }

        const addProduct = await CartManager.addProductToCart(cartId, product.id);
        res.json({message:'Producto agregado al carrito de compras', cart: addProduct});
    } catch (error) {
        res.status(500).json({error: 'Error al agregar producto al carrito de compras'})
    }
});

export default router;