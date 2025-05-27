import { productModel } from "../models/product.model.js";

class ProductService{
    
    async getAll(){
        return await productModel.find();
    }

    async getById(id){
        return await productModel.findById(id);
    }

    async getByCode(code){
        return await productModel.findOne({code})
    }

    async create(product){
        return await productModel.create(product);
    }

    async update(id, updateData){
        return await productModel.create(id, updateData)
    }

    async deleteOne(id){
        return await productModel.deleteOne({_id:id})
    }
}

export default new ProductService;