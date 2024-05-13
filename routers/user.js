import express from "express"
import User from "../models/user.js"
import Cart from "../models/cart.js"
import Order from "../models/order.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    const body = req.body
    const existingUser = await User.findOne({ email: body?.email })
    if (existingUser) {
        res.send({
            status: "fail",
            msg: "User already exists"
        })
    } else {
        const user = await User.create({
            email: body?.email,
            name: body?.name,
            password: body?.password
        })
        const cart = await Cart.create({
            user: user?._id,
            totalPrice: 0
        })
        if (user && cart) {
            res.send({
                status: "success",
                user,
                cart
            })
        } else {
            res.send({
                status: "fail",
                msg: "Something went wrong!"
            })
        }
    }

})

router.post("/login", async (req, res) => {
    const body = req.body
    const user = await User.findOne({email: body?.email})
    if (!user) {
        res.send({
            status: "fail",
            msg: "User doesn't exists"
        })
    } else if (user?.password !== body?.password) {
        res.send({
            status: "fail",
            msg: "Invalid Credentials"
        })
    } else {
        const cart = await Cart.findOne({user: user._id}).populate('products.product')
        const order = await Order.findOne({user: user._id}).populate('products.product')
        res.send({
            status: "success",
            user,
            cart,
            order
        })
    }
})

router.post("/update", async (req, res) => {
    const body = req.body    
        const user = await User.findOneAndUpdate({email: body?.email}, {
            name: body?.name,
            email: body?.email,
            password: body?.password,
            photo: body?.photo,
            address: body?.address,
        })
        if (user) {
            const updatedUser = await User.findOne({email: body?.email})
            const cart = await Cart.findOne({user: user._id}).populate('products.product')
            res.send({
                status: "success",
                updatedUser,
                cart
            })
        } else {
            res.send({
                status: "fail",
                msg: "Something went wrong!"
            })
        }
    
})

router.delete("/", async (req, res) => {
    const user = await User.findByIdAndDelete(req.body?.id)
    if (user) {
        res.send({
            status: "success",
            user
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

export default router