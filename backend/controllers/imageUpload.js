import { cloudinaryUploader } from "../config/cloudinaryConfig.js"
import fs from "fs"
import User from "../model/userSchema.js"
import Prod from "../model/productSchema.js"

export const imageUpload = async (req, res) => {
    try {
        // console.log("req", req.file)
        // Upload an image
        const uploadResult = await cloudinaryUploader.upload(req.file.path)
        // console.log("uploadResult", uploadResult)
        fs.unlinkSync(req.file.path)
        res.json({
            data:
            {
                url: uploadResult.secure_url,
                name: uploadResult.original_filename,
            }
            ,
            status: true,
            message: "Image upload successfully!"
        })

    } catch (error) {
        res.json({
            data:
                []
            ,
            status: false,
            message: error.message
        })
    }


}

export const prodImage = async(req,res)=>{
    try {
        // console.log("req", req.file)
        // Upload an image
        const uploadResult = await cloudinaryUploader.upload(req.file.path)
        // console.log("uploadResult", uploadResult)
        fs.unlinkSync(req.file.path)
        res.json({
            data:
            {
                url: uploadResult.secure_url,
                name: uploadResult.original_filename,
            }
            ,
            status: true,
            message: "Image upload successfully!"
        })

    } catch (error) {
        res.json({
            data:
                []
            ,
            status: false,
            message: error.message
        })
    }   
}