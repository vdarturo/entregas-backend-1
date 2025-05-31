import {Schema, model} from 'mongoose';
import { productModel } from "../models/product.model.js";

const cartSchema = new Schema({
    //products: [{ type: Schema.Types.ObjectId, ref: productModel }],
    products: {
        type: [
            {
                product:{
                    type: Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ]
    },
    total: {
        type: Number,
        required: true,
    }
    /*products:{
        type: Array,
        default: [],
        required: true,
    }*/
});

export const cartModel = model('cart', cartSchema);