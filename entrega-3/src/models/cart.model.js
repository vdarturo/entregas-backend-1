import {Schema, model} from 'mongoose';

const cartSchema = new Schema({
    products:[{
        type: Schema.Types.ObjectId,
        default: [],
        ref: "product"
    }],
    total: {
        type: Number,
        required: true
    }
});

export const cartModel = model('cart', cartSchema);