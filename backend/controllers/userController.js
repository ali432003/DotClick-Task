import User from "../model/userSchema.js";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { email, name, age, password,img } = req.body
        if (!email || !name || !password || !age) {
            res.json({ message: "Fill all Fields", status: false })
            return
        }
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            // error    
            res.status(400).json({ status: false, data: [], message: "user already exist" })
        }
        const hashPass = await bcrypt.hash(password, 10)
        const obj = { ...req.body, password: hashPass }
        const newUser = new User(obj)
        await newUser.save()
        res.status(200).json({ status: true, data: newUser, message: "user created !" })
        // success

    } catch (error) {
        res.status(404).json({ message: error.message, status: 404 })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id, email: user.email }, "PRIVATEKEY")
                res.json({ status: true, data: user, message: "User logged in successfully", token });
            } else {
                res.json({ status: false, data: [], message: "Incorrect password" });
            }
        } else {
            res.json({ status: false, data: [], message: "User does not exist" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const _id = req.params.id
        const updUser = await User.findByIdAndUpdate(_id, req.body, { new: true })
        res.json({ status: true, message: "user updated", data: updUser })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const _id = req.params.id
        const CurrUser = await User.findOne({ _id: _id })
        if (CurrUser) {
            return res.json({ message: "user found", data: CurrUser, status: true })
        }
        return res.json({ message: "no such user found", data: [], status: false })
    } catch (error) {
        return res.json({ message: error.message, data: [], status: false })
    }
}

// const SendOTP = new Promise(async (resolve, reject) => {
//     try {
//         const transporter = nodemailer.createTransport(
//             {
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.email,
//                     pass: process.env.pass
//                 }
//             }
//         );
//         const otp = Math.floor(100000 + Math.random() * 900000);
//         await transporter.sendMail({
//             from: process.env.email,
//             to: email,
//             subject: "Email Verfication",
//             html: EmailVerificationHtml(otp),
//         })
//         const responseOTP = await OTPModel.create({
//             otp,
//             email
//         })
//         resolve({ responseOTP })

//     } catch (error) {
//         reject({
//             message: error.message,
//             status: false,
//             data: [],
//         })
//     }
// })
















// export const OTPVerification = async (request, response) => {
//     try {
//         const { email, otp } = request.body

//         if (!email || !otp) {
//             response.json({
//                 message: "required fields are missing!",
//                 status: false
//             })
//             return
//         }

//         const otpRes = await OTPModel.findOne({ email, otp })
//         console.log("otpRes", otpRes)
//         if (!otpRes) {
//             response.json({
//                 message: "Invalid OTP!",
//                 status: false
//             })
//             return
//         }

//         if (otpRes.isUsed) {
//             response.json({
//                 message: "Invalid OTP!",
//                 status: false
//             })
//             return
//         }

//         const ress = await OTPModel.findOneAndUpdate({ _id: otpRes._id }, {
//             isUsed: true
//         })
//         console.log("ress", ress)
//         response.json({
//             message: "OTP Verify!",
//             status: true,
//             data: []
//         })
//         // console.log()

//     } catch (error) {
//         response.json({
//             message: error.message,
//             status: false,
//             data: [],
//         })
//     }
// }






