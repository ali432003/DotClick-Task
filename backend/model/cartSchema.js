import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        require: false,
        default: 1,
    },
    category: {
        type: String,
        required: true
    }
})

const Cart = mongoose.model('Cart', cartSchema);
export default Cart
