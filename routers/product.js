import express from "express"
import Product from "../models/product.js"

const router = express.Router()

router.get("/all", async (req, res) => {
    const products = await Product.find()
    res.send({
        status: "success",
        products
    })
})

router.get("/:id", async (req, res) => {
    const body = req.body
    const id = req.params.id
    const product = await Product.findById(id)
    if (product) {
        res.send({
            status: "success",
            product
        })
    } else {
        res.send({
            status: "fail",
            msg: "Something went wrong!"
        })
    }
})

router.post("/create", async (req, res) => {
    const body = req.body
    const product = await Product.create({
        name: body?.name,
        description: body?.description,
        price: body?.price,
        photo: body?.photo,
        stock: body?.stock,
    })
    if (product) {
        res.send({
            status: "success",
            product
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
    const product = await Product.findByIdAndUpdate(body?.id, {
        name: body?.name,
        description: body?.description,
        price: body?.price,
        photo: body?.photo,
        stock: body?.stock,
    })
    const products = await Product.find()
    if (product) {
        res.send({
            status: "success",
            products
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