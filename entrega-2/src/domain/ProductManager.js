import fs from 'fs';

class ProductManager{
    constructor(path){
        this.path=path;
    }

    async getProducts(){
        try {
            if(!fs.existsSync(this.path)) return [];

            const data= await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los productos: ', error);
            return [];
        }
    }
    
    async addProduct({title, description, code, price, stock, thumbnail}){
        try{
            const products = await this.getProducts();

            if(products.some(product => product.code === code)){
                throw new Error(`El código "${code}" ya existe`);
            }

            const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            const newProduct = {id, title, description, code, price, stock, thumbnail};

            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error('Error al agregar un producto: ', error);
            return [];
        }
    }

    async getProductById(id){
        try{
            const products = await this.getProducts();
            return products.find(product => product.id === id) || null;
        } catch (error) {
            console.error('Error al leer un producto: ', error);
            return [];
        }
    }

    async updateProduct(id,updatedData){
        try{
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);

            if(index === -1) throw new Error(`El producto con ID ${id} no existe`);

            products[index] = { ...products[index], ...updatedData };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } catch (error) {
            console.error('Error al actualizar un producto: ', error);
            return [];
        }
    }

    async deleteProductById(id){
        try{
            const products = await this.getProducts();
            const newProducts = products.filter(product => product.id !== id);

            if(products.length === newProducts.length){
                throw new Error(`El producto con ID ${id} no existe`);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
        } catch (error) {
            console.error('Error al eliminar un producto:', error);
            return [];
        }
    }
}

export default ProductManager ;