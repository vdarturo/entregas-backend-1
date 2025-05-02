import express from 'express';
import PM from './ProductManager.js';
import CM from './CartManager.js';

const app = express();
const PORT = 8080;
const ProductManager = new PM('./products.json');
const CartManager = new CM('./carts.json');

app.use(express.json())

app.get('/api/products', async (req,res)=>{
    try {
        const products = await ProductManager.getProducts();
        res.json({products});
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
})

app.get('/api/products/:id', async (req,res)=>{
    const productId = parseInt(req.params.id)

    try {
        const product = await ProductManager.getProductById(productId);

        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
})

app.post('/api/products', async(req,res)=>{
    try {
        const newProduct = await ProductManager.addProduct(req.body);
        res.status(201).json({message:'Producto agregado', product: newProduct})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.put('/api/products/:pid', async (req,res)=>{
    const productId = parseInt(req.params.pid);

    try {
        const updateProduct = await ProductManager.updateProduct(productId, req.body);
        res.json({message:'Producto actualizado', product: updateProduct});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
})

app.delete('/api/products/:pid', async (req,res)=>{
    const productId= parseInt(req.params.pid);

    try {
        await ProductManager.deleteProductById(productId);
        res.json({message:`Producto con ID ${productId} eliminado`});
    } catch (error) {
        res.status(404).json({error:error.message});
    }
})

app.post('/api/carts', async(req,res)=>{
    try {
        const newCart = await CartManager.createCart(req.body);
        res.status(201).json({message:'Nuevo carrito de compras', cart: newCart})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.get('/api/carts/:id', async (req,res)=>{
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
})

app.post('/api/carts/:cartId/product/:productId', async(req,res)=>{
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
})

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})