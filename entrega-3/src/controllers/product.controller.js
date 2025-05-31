import productService from "../services/product.service.js";

export async function getAllProducts(req, res){
    try {
        const { limit, page } = req.query; 
        const options = {
            page: page || 1,
            limit: limit || 10,
            customLabels: {docs: 'payload'}
        };
        const products =  await productService.getAll(options);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function getProductById(req, res){
    try {
        const {pid} = req.params;
        const product =  await productService.getById(pid);
        if(!product) res.status(404).json({message:'Producto no encontrado'});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function createProduct(req, res){
    try {
        const {title, description, code, price, stock, thumbnails, category} = req.body;
        
        if(!title || !description || !code || !price || !stock || !thumbnails || category){
            res.status(400).json({message:'Alguno de los datos necesarios no se ha proporcionado'});
        }

        const product = await productModel.findOne({code});
        if(product) res.status(409).json({message:'El codigo de producto ya existe'});

        await productService.create({title, description, code, price, stock, thumbnails, category});
        res.status(201).json({message:'Producto creado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function updateProduct(req,res){
    try {
        const {pid} = req.params;
        const {title, description, code, price, stock, thumbnails, category}= req.body;
        const product = {title, description, code, price, stock, thumbnails, category}

        await productService.update(pid, product);
        res.status(200).json({message:'Producto actualizado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function deleteProduct(req,res){
    try {
        const {pid} = req.params;

        await productService.delete(pid);
        res.status(200).json({message:'Producto eliminado'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}