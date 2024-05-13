import express from "express"
import Cart from "../models/cart.js"

const router = express.Router()

router.get("/all", async (req, res) => {
    const carts = await Cart.find()
    res.send({
        status: "success",
        carts
    })
})

router.post("/", async (req, res) => {
    const userId = req.body?.userId
    const cart = await Cart.findOne({user: userId}).populate('user').populate('products')
    if (cart) {
        res.send({
            status: "success",
            cart
        })
    } else {
        res.send({
            status: "fail",
            msg: "No cart found!"
        })
    }
})

router.post("/create", async (req, res) => {
    const userId = req.body?.userId
    const cart = await Cart.findOne({user: userId}).populate('user').populate('products')
    if (!cart) {
        const newCart = (await Cart.create({user: userId, totalPrice: 0})).populate('user')
        if (newCart) {
            res.send({
                status: "success",
                newCart
            })
        } else {
            res.send({
                status: "fail",
                msg: "Something went wrong!"
            })
        }
    } else {
        res.send({
            status: "fail",
            msg: "Cart already exists"
        })
    }
})

router.post("/add", async (req, res) => {
    const body = req.body
    const cart = await Cart.findOne({user: body?.userId}).populate('products')
    let product = cart.products.find(p => p?.product?._id.toString() === body?.productData?.product?._id?.toString())
    let products = []
    if (product) {
        console.log("prod");
        const otherProducts = cart.products.filter(prod => prod?.product?._id.toString() !== product?.product?._id.toString())
        product['quantity'] = product?.quantity + body?.productData?.quantity
        products = [...otherProducts, product]
    } else {
        console.log("no prod");
        products = [...cart.products, body?.productData]
    }
    
    await Cart.findOneAndUpdate({user: body?.userId}, {products})
    const updatedCart = await Cart.findOne({user: body?.userId}).populate('products.product')
    if (updatedCart) {
        res.send({
            status: "success",
            cart: updatedCart
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

router.post("/quantity", async (req, res) => {
    const body = req.body
    console.log(body);
    const cart = await Cart.findOne({user: body?.userId}).populate('products')
    let product = cart.products.find(p => p?.product?._id.toString() === body?.productData?.product?._id?.toString())
    let products = []
    if (product) {
        console.log("prod");
        const otherProducts = cart.products.filter(prod => prod?.product?._id.toString() !== product?.product?._id.toString())
        if (body?.isIncrement) {
            product['quantity'] = product?.quantity + 1
        } else {
            product['quantity'] = product?.quantity - 1
        }
        products = [...otherProducts, product]
    } else {
        console.log("no prod");
        products = [...cart.products, body?.productData]
    }
    
    await Cart.findOneAndUpdate({user: body?.userId}, {products})
    const updatedCart = await Cart.findOne({user: body?.userId}).populate('products.product')
    if (updatedCart) {
        res.send({
            status: "success",
            cart: updatedCart
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

router.post("/remove", async (req, res) => {
    const body = req.body
    const cart = await Cart.findOne({user: body?.userId}).populate('products')
    const products = cart.products.filter(prod => prod?.product?._id.toString() !== body?.productId)
    await Cart.findOneAndUpdate({user: body?.userId}, {products})
    const updatedCart = await Cart.findOne({user: body?.userId}).populate('products.product')
    if (updatedCart) {
        res.send({
            status: "success",
            cart: updatedCart
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

router.post("/update", async (req, res) => {
    const body = req.body
    
})

router.delete("/", async (req, res) => {
    const userId = req.body.userId
    const cart = await Cart.findOneAndDelete({user: userId})
    if (cart) {
        res.send({
            status: "success",
            updatedCart
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
    
})

export default router