import { Router } from "express";
import {
    createCart,
    getCartById,
    addProductToCart,
    deleteCart,
    removeProduct
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post('/', createCart);
cartRouter.get('/:cid', getCartById);
cartRouter.post('/:cid/product/:pid', addProductToCart);
cartRouter.delete('/:cid', deleteCart);
cartRouter.delete('/:cid/product/:pid', removeProduct);

export default cartRouter;