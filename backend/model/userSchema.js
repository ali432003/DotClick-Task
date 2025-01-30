import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
    },
    password: {
        type: String,
        required: true
    }
}, { timeStamps: true })

const User = mongoose.model("user", userSchema)
export default User