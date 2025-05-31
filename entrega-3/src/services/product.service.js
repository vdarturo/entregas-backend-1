import { productModel } from "../models/product.model.js";

class ProductService{
    async getAll(options){
        try {
            return await productModel.paginate({}, options);
        } catch (error) {
            console.error('Error al leer los productos: ', error);
            throw error;
        }
    }
        
    async create({title, description, code, price, stock, thumbnail, category}){
        try{
            const product = await productModel.findOne({code});

            if(product){
                throw new Error(`El código "${code}" ya existe`);
            }

            const newProduct = {title, description, code, price, stock, thumbnail, category};
            return await productModel.create(newProduct);
        } catch (error) {
            console.error('Error al agregar un producto: ', error);
            throw error;
        }
    }
    
    async getById(id){
        try{
            return await productModel.findById(id);
        } catch (error) {
            console.error('Error al leer un producto: ', error);
            throw error;
        }
    }
    
    async update(id,updateData){
        try{
            const product = await productModel.findById(id);

            if(product) throw new Error(`El producto con ID ${id} no existe`);

            return await productModel.create(id, updateData)
        } catch (error) {
            console.error('Error al actualizar un producto: ', error);
            throw error;
        }
    }
    
    async delete(id){
        try{
            const product = await productModel.findById(id);

            if(product) throw new Error(`El producto con ID ${id} no existe`);

            return await productModel.deleteOne({_id:id})
        } catch (error) {
            console.error('Error al eliminar un producto:', error);
            throw error;
        }
    }
}

export default new ProductService;