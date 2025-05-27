import { cartModel } from "../models/cart.model.js";

class CartService{

    async getAll(){
        return await cartModel.find();
    }

    async getById(id){
        return await cartModel.findById(id);
    }

    async create(cart){
        return await cartModel.create(cart);
    }

    async update(id, updateData){
        return await cartModel.create(id, updateData)
    }

    async deleteOne(id){
        return await cartModel.deleteOne({_id:id})
    }
}

export default CartService;