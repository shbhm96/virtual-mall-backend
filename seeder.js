import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"
import products from "./data/product.js"
import connectDB from "./config/database.js";
import Product from "./models/seller/productModel.js";
import Order from "./models/cust/orderModel.js";

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()              

        const sampleProduct = products.map(product=>{
            return{...product}
        })

        await Product.insertMany(sampleProduct)

        console.log("Data Imported".green.inverse)
        process.exit()

    }catch(error){
        console.error(`${error}`.red.bold)
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("Data Destroyed".red.inverse)
        process.exit()

    }catch(error){
        console.error(`${error}`.red.bold)
        process.exit(1)
    }
}

if(process.argv[2]==="-d"){
    destroyData()
}else{
    importData()
}
