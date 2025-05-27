import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const cartSchema = new Schema({
    products:{
        type: Array,
       default: []
    },
    total:{
        type: Number,
        required: true,
    },
});

export const cartModel = model('cart', cartSchema);