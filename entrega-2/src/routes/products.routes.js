import { Router } from "express";
import PM from '../domain/ProductManager.js';

const router = Router();
const ProductManager = new PM('./products.json');

router.get('/', async (req,res)=>{
    try {
        const products = await ProductManager.getProducts();
        res.json({products});
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
})

router.get('/:id', async (req,res)=>{
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
});

router.post('/', async(req,res)=>{
    try {
        console.log(req.body)
        const newProduct = await ProductManager.addProduct(req.body);
        res.status(201).json({message:'Producto agregado', product: newProduct})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.put('/:pid', async (req,res)=>{
    const productId = parseInt(req.params.pid);

    try {
        const updateProduct = await ProductManager.updateProduct(productId, req.body);
        res.json({message:'Producto actualizado', product: updateProduct});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.delete('/:pid', async (req,res)=>{
    const productId= parseInt(req.params.pid);

    try {
        await ProductManager.deleteProductById(productId);
        res.json({message:`Producto con ID ${productId} eliminado`});
    } catch (error) {
        res.status(404).json({error:error.message});
    }
});
  
export default router;