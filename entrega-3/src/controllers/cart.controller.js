/*import fs from 'fs';

class CartManager{
    constructor(path){
        this.path=path;
    }

    async getCarts(){
        try {
            if(!fs.existsSync(this.path)) return [];

            const data= await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los carritos de compras: ', error);
            return [];
        }
    }

    async createCart(){
        try {
            const carts = await this.getCarts();
            const products = [];

            const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
            const newCart = {id, products};

            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            console.error('Error al crear nuevo carrito de compras: ', error);
            return [];
        }
    }

    async getCartById(id){
        try{
            const carts = await this.getCarts()
            return carts.find(cart => cart.id === id) || null;
        } catch (error) {
            console.error('Error al leer el carrito de compra: ', error);
            return [];
        }
    }

    async addProductToCart(cartId, productId){
        try{
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);

            if(cartIndex === -1) throw new Error(`El carrito de compras con ID ${cartId} no existe`);

            const productIndex = carts[cartIndex].products.findIndex(a => a.product === productId);

            if(productIndex === -1){
                carts[cartIndex].products.push({"product": productId, "quantity": 1});
            }else{
                const newQuantity = carts[cartIndex].products[productIndex].quantity += 1;
                carts[cartIndex].products[productIndex].quantity = newQuantity;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return carts[cartIndex];
        } catch (error) {
            console.error('Error al agregar un producto al carrito de compras: ', error);
            return [];
        }
    }
}

export default CartManager ;*/