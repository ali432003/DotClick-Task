import 'dotenv/config'
import express from "express";
import { getUser, login, signup, updateUser } from "../controllers/userController.js";
import { addProd, deleteProd, getProd, updateProd } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import { cloudinaryUploader } from "../config/cloudinaryConfig.js";
import { imageUpload, prodImage } from "../controllers/imageUpload.js"
import { addToCart, deleteCartItem, getCartItem, makePayment } from "../controllers/cartController.js";
import { loginAdmin, registerAdmin } from "../controllers/adminControllers.js";
import { auth } from "../middlewares/jwt.js";
const router = express.Router()

// root api
router.get(("/"), (req, res) => {
    res.json({ message: "hellow world" })
})

// user apis
router.post(("/signup"), signup)

router.post("/login", login);

router.put(('/updateuser'),auth, updateUser)

router.get(('/getuser'),auth, getUser)


// Product Apis
router.post(("/addproduct"), addProd)

router.get(("/getprod"), getProd)

router.put(("/updateprod/:id"), updateProd)

router.delete(("/deleteprod/:id"), deleteProd)


// Cart API
router.post(("/addtocart"),auth, addToCart)

router.get(("/getcartitem"),auth, getCartItem)

router.delete(("/deletecartitem/:id"),auth, deleteCartItem)

// Stripe Payment Gateway API
router.post("/payment",auth, makePayment)


//Images API
router.post("/imageupload",auth, upload.single("userImg"), imageUpload)

router.post("/prodImgupload", upload.single("productImg"), prodImage)

// Admin API
router.post(("/registerAdmin"), registerAdmin)

router.post(("/loginAdmin"), loginAdmin)



export default router