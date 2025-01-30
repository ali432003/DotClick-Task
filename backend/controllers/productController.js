import Prod from "../model/productSchema.js"

export const addProd = async (req, res) => {
    try {
        const { name, price, description, category, img } = req.body;
        const prodExist = await Prod.findOne({ name: name })
        if (prodExist) {
            res.status(400).json({ data: [], status: false, message: "Product already exist" })
            return
        }
        const product = new Prod({ name, price, description, category, img });
        await product.save();
        res.status(201).json({ data: product, status: true, message: "product added!" });
    } catch (error) {
        res.status(400).json({ data: [], status: false, message: error.message });
    }
}

export const getProd = async (req, res) => {
    try {
        const product = await Prod.find({})
        res.status(200).json({ data: product, message: "product received" ,status:true})
    } catch (error) {
        res.status(404).json({ data: [], message: "product not found!",status:false })
    }
}

export const updateProd = async (req, res) => {
    try {
        const _id = req.params.id
        const updProd = await Prod.findByIdAndUpdate(_id, req.body, { new: true })
        res.json({ status: true, message: "Prod updated", data: updProd })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

export const deleteProd = async (req, res) => {
    try {
        const _id = req.params.id
        await Prod.findByIdAndDelete(_id)
        res.status(200).json({ message: "user deleted", status: true })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}