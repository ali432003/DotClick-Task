import Cart from "../model/cartSchema.js"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);

export const addToCart = async (req, res) => {
  try {
    const uid = req.user._id
    const { name, img, price, category } = req.body
    if (!uid) {
      res.json({ status: false, data: [], message: "unknown cart product" })
      return
    }
    const alreadyThere = await Cart.findOne({ name, uid })
    if (alreadyThere) {
      await Cart.findOneAndUpdate({ name, uid }, { $inc: { quantity: 1, price: price } })
      return res.status(201).json({ status: true, message:'Item Incremented' })
    }
    const cart = new Cart({ name, price, category, uid, img });
    await cart.save();
    res.status(201).json({ data: cart, status: true, message: "Item added!" });

  } catch (error) {
    res.json({ message: error.message })
  }
}

export const getCartItem = async (req, res) => {
  try {
    const _uid = req.user._id
    const cartItem = await Cart.find({ uid: _uid })
    res.status(201).json({ data: cartItem, status: true, message: "cart item is found" })
  } catch (error) {
    res.status(400).json({ data: [], message: error.message })
  }
}

export const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id
    const uid = req.user._id
    const deleteItem = await Cart.findOneAndDelete({ _id: id, uid: uid })
    res.status(201).json({ data: deleteItem, status: true, message: "Item deleted Successfully" })
  } catch (error) {
    res.status(401).json({ data: [], status: false, message: error.message })
  }
}

export const makePayment = async (req, res) => {

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
      }),
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}