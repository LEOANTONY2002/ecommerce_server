import express from "express"
import Order from "../models/order.js"
import Cart from "../models/cart.js"
import Razorpay from "razorpay"

const router = express.Router()

router.get("/all", async (req, res) => {
    const orders = await Order.find().populate('user').populate('products.product')
    res.send({
        status: "success",
        orders
    })
})

router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id).populate('products.product')
    if (order) {
        res.send({
            status: "success",
            order
        })
    } else {
        res.send({
            status: "fail",
            msg: "No order found!"
        })
    }
})

router.post("/", async (req, res) => {
    const userId = req.body?.userId
    const orders = await Order.find({user: userId}).populate('user').populate('products.product')
    if (orders) {
        res.send({
            status: "success",
            orders
        })
    } else {
        res.send({
            status: "fail",
            msg: "No orders found!"
        })
    }
})

router.post('/razorpay', async (req, res) => {
    // initializing razorpay
    const razorpay = new Razorpay({
        key_id: "rzp_test_6lF4BIPebmfLkI",
        key_secret: "JJuH18GxlFTyA9btM3sYSI9v",
    });

    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
        res.send({
            status: "success",
            order_id: response.id,
        })
    } catch (err) {
        res.send({
            status: "fail",
            err
        })
    }
});

router.post("/create", async (req, res) => {
    const body = req.body
    const order = await Order.create({
        user: body?.user,
        products: body?.products,
        totalPrice: body?.totalPrice,
        shippingAddress: body?.shippingAddress,
        paymentMode: body?.paymentMode
    })
    if (order) {
        const cart = await Cart.findOneAndUpdate({user: body?.user}, {products: []})
        const updatedCart = await Cart.findOne({user: body?.user}).populate('products.product')
        const orders = await Order.find({user: body?.user}).populate('products.product')
        if (cart) {
            res.send({
                status: "success",
                order,
                orders,
                updatedCart
            })
        } else {
            res.send({
                status: "fail",
                msg: "Something went wrong on cart!"
            })
        }
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

router.post("/update", async (req, res) => {
    const body = req.body
    const order = await Order.findByIdAndUpdate(body?.id, {
        deliveryDate: body?.deliveryDate,
        deliveryStatus: body?.deliveryStatus,
    })
    if (order) {
        const orders = await Order.find().populate('user').populate('products.product')
        res.send({
            status: "success",
            orders
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

router.post("/delete", async (req, res) => {
    const body = req.body
    
})

export default router