import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const order = mongoose.model('Order', orderSchema);
export default order
