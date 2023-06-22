import connectDB from "./config/database.js";
import express from "express";
import cors from "cors"
import colors from 'colors';
import dotenv from "dotenv"
import morgan from "morgan";
import bodyParser from "body-parser";

import sellerRoutes from "./routes/seller/sellerRoutes.js"
import custRoutes from "./routes/cust/custRoutes.js"
import sellerProducts from "./routes/seller/productsRoutes.js"


dotenv.config()

connectDB()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.use("/api/seller",sellerRoutes)
sellerRoutes.use("/products",sellerProducts)

app.use("/api/cust",custRoutes)
app.use("/",(req,res)=>{
    res.send("API IS RUNNING!!!!!!1!!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.bold))