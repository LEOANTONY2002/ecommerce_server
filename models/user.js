import mongoose, { SchemaType } from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    address: {
        type: Object,
    },
}, { timestamps: { createdAt: true, updatedAt: true } })

export default mongoose.model("User", userSchema)