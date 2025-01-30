import express from "express";
import { getUser, login, signup, updateUser } from "../controllers/userController.js";
import { addProd, deleteProd, getProd, updateProd } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import { cloudinaryUploader } from "../config/cloudinaryConfig.js";
import { imageUpload } from "../controllers/imageUpload.js"
import { addToCart, deleteCartItem, getCartItem } from "../controllers/cartController.js";
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

router.put(('/updateuser/:id'),auth, updateUser)

router.get(('/getuser/:id'),auth, getUser)


// Product Apis
router.post(("/addproduct"), addProd)

router.get(("/getprod"), getProd)

router.put(("/updateprod/:id"), updateProd)

router.delete(("/deleteprod/:id"), deleteProd)


// Cart API
router.post(("/addtocart"), addToCart)

router.get(("/getcartitem/:uid"), getCartItem)

router.delete(("/deletecartitem/:id"), deleteCartItem)


//Images API
router.post("/imageupload", upload.single("userImg"), imageUpload)

router.post("/prodImgupload", upload.single("productImg"), imageUpload)

// Admin API
router.post(("/registerAdmin"), registerAdmin)

router.post(("/loginAdmin"), loginAdmin)



export default router