import Cart from "../model/cartSchema.js"

export const addToCart = async (req, res) => {
    try {
        const { uid, name, img, price, category } = req.body
        if (!uid) {
            res.json({ status: false, data: [], message: "unknown cart product" })
            return
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
        const _uid = req.params.uid
        const cartItem = await Cart.find({ uid: _uid })
        res.status(201).json({ data: cartItem, status: true, message: "cart item is found" })
    } catch (error) {
        res.status(400).json({ data: [], message: error.message })
    }
}

export const deleteCartItem = async (req, res) => {
    try {
        const id = req.params.id
        const { uid } = req.body
        const deleteItem = await Cart.findOneAndDelete({ _id: id, uid: uid })
        res.status(201).json({ data: deleteItem, status: true, message: "Item deleted Successfully" })
    } catch (error) {
        res.status(401).json({ data: [], status: false, message: error.message })
    }
} 