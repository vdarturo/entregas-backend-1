import productService from "../services/product.service.js";

export async function getAllProducts(req, res){
    try {
        //const limit = req.query.limit || 10;
        const { limit, page } = req.query; 
        const options = {
            page: page || 1,
            limit: limit || 10
        };
        const products =  await productService.getAll(options);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function getProductById(req, res){
    try {
        const {id} = req.params;
        const product =  await productService.getById(id);
        if(!product) res.status(404).json({message:'Producto no encontrado'});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function createProduct(req, res){
    try {
        const {title, description, code, price, stock, thumbnails} = req.body;
        
        if(!title || !description || !code || !price || !stock || !thumbnails){
            res.status(400).json({message:'Alguno de los datos necesarios no se ha proporcionado'});
        }

        const productExist = await productService.getByCode();
        if(productExist) res.status(409).json({message:'El codigo de producto ya existe'});

        const product =  await productService.create({title, description, code, price, stock, thumbnails});
        res.status(201).json({message:'Producto creado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function updateProduct(req,res){
    try {
        const {id} = req.params;
        const {title, description, code, price, stock, thumbnails}= req.body;
        const newProduct = {title, description, code, price, stock, thumbnails}
        await productService.update(id, newProduct);
        res.status(200).json({message:'Producto actualizado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function deleteProduct(req,res){
    try {
        const {id} = req.params;
        await productService.deleteOne(id);
        res.status(200).json({message:'Producto eliminado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}