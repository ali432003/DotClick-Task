import Admin from "../model/adminSchema.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

export const registerAdmin = async (req,res)=>{
    try {
        const { email, name, password} = req.body
        if (!email || !name || !password) {
            res.json({ message: "Fill all Fields", status: false })
            return
        }
        const AdminExist = await Admin.findOne({ email: email })
        if (AdminExist) {
            // error    
            res.status(400).json({ status: false, data: [], message: "admin already exist" })
        }
        const hashPass = await bcrypt.hash(password, 10)
        const obj = { ...req.body, password: hashPass }
        const newAdmin = new Admin(obj)
        await newAdmin.save()
        res.status(200).json({ status: true, data: newAdmin, message: "Admin created !" })
        // success

    } catch (error) {
        res.status(404).json({ message: error.message, status: 404 })
    }

}


export const loginAdmin = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                const token = jwt.sign({ _id: admin._id, email: admin.email }, "PRIVATEKEY")
                res.json({ status: true, data: admin, message: "Admin logged in successfully", token });
            } else {
                res.json({ status: false, data: [], message: "Incorrect password" });
            }
        } else {
            res.json({ status: false, data: [], message: "Admin does not exist" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}