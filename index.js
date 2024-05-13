import express from "express"
import cors from "cors"
import userRouter from "./routers/user.js"
import productRouter from "./routers/product.js"
import cartRouter from "./routers/cart.js"
import orderRouter from "./routers/order.js"
import mongoose from "mongoose"


const app = express()

app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)

const middle = (req, res, next) => { console.log("middle"); next() }

app.get("/", middle, (req, res) => {
    console.log("hi");
    res.send("welcome")
})


app.listen(5000, () => {
    console.log("Server Started...")
    mongoose.connect("mongodb+srv://leo:leo@cluster.yheps7e.mongodb.net/ecom").then(() => console.log("DB Started..."))
})
