import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";

export async function createCart(req, res){
    try {
        const cart = await cartService.create();
        res.status(201).json({message:'Carrito creado', cid: cart._id.toString()});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

export async function getCartById(req, res){
    try {
        const {cid} = req.params;
        const cart =  await cartService.getById(cid);
        if(!cart) res.status(404).json({message:'Carrito de compras no encontrado'});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function addProductToCart(req, res){
    try {
        const {cid, pid} = req.params;

        const cart =  await cartService.getById(cid);
        if(!cart) res.status(404).json({message:'Carrito de compras no encontrado'});

        const product =  await productService.getById(pid);
        if(!product) res.status(404).json({message:'Producto no encontrado'});

        await cartService.addProduct(cart, product);
        res.status(200).json({message:'Product agregado correctamente al carrito de compras'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function deleteCart(req,res){
    try {
        const {cid} = req.params;

        const cart =  await cartService.getById(cid);
        if(!cart) res.status(404).json({message:'Carrito de compras no encontrado'});

        await cartService.delete(cid);
        res.status(200).json({message:'Carrito de compras eliminado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}