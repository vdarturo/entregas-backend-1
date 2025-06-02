import { cartModel } from "../models/cart.model.js";

class CartService{
    async create(){
        try {
            const cart = {
                products: [],
                total:0
            } 
            return await cartModel.create(cart);
        } catch (error) {
            console.error('Error al crear nuevo carrito de compras: ', error);
            throw error;
        }
    }

    async getById(cid){
        try{
            return await cartModel.findById(cid).populate("products");
        } catch (error) {
            console.error('Error al leer un carrito de compras: ', error);
            throw error;
        }
    }

    async addProduct(cart, product){
        try{
            cart.products.push(product);

            let total = 0
            cart.products.forEach(function(product) {
                total += product.price 
            });

            cart.total = total;
            
            return await cartModel.updateOne({_id: cart._id}, cart);
        } catch (error) {
            console.error('Error al agregar un producto al carrito de compras: ', error);
            throw error;
        }
    }

    async delete(cid){
        try{
            return await cartModel.deleteOne({_id:cid})
        } catch (error) {
            console.error('Error al eliminar un carrito de compras:', error);
            throw error;
        }
    }
}

export default new CartService;