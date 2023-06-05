import connectDB from "./config/database.js";
import express from "express";
import cors from "cors"
import colors from 'colors';
import dotenv from "dotenv"

import sellerRoutes from "./routes/seller/sellerRoutes.js"
import custRoutes from "./routes/cust/custRoutes.js"
import morgan from "morgan";

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.use("/api/seller",sellerRoutes)
app.use("/api/cust",custRoutes)
app.use("/",(req,res)=>{
    res.send("API IS RUNNING")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.bold))