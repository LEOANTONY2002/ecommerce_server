import mongoose, { Schema } from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
    },
    shippingAddress: {
        type: Object,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true,
        default: new Date(new Date().getTime()+(5*24*60*60*1000))
    },
    deliveryStatus: {
        type: String,
        required: true,
        default: "PLACED"
    }
}, { timestamps: { createdAt: true, updatedAt: true } })

export default mongoose.model("Order", orderSchema)