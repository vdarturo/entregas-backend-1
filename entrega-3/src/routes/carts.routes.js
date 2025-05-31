import { Router } from "express";
import {
    createCart,
    getCartById,
    addProductToCart,
    deleteCart
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post('/', createCart);
cartRouter.get('/:cid', getCartById);
cartRouter.post('/:cid/product/:pid', addProductToCart);
cartRouter.delete('/:cid', deleteCart);

export default cartRouter;