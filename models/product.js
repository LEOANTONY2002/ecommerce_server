import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    }
}, { timestamps: { createdAt: true, updatedAt: true } })

export default mongoose.model("Product", productSchema)