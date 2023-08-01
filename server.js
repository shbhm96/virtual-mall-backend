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
import multer from "multer";
import crypto from "crypto"
import { S3Client } from "@aws-sdk/client-s3";

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
app.use("/api/cust/",custRoutes)



//Image Uploading

const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const randomImageName = (bytes = 32) => 
{
    return crypto.randomBytes(bytes).toString('hex')
}
const bucketRegion = process.env.AWS_S3_BUCKET_REGION
const bucketName = process.env.AWS_S3_BUCKET_NAME
const accessKey = process.env.AWS_S3_ACCESS_KEY
const secretKey = process.env.AWS_S3_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey:secretKey
    },
    region:bucketRegion
})

app.use("/api/images",upload.single("image"),async(req,res)=>{
    const file = req.file
    console.log(req.body)
    console.log(req.file)
    //resize image


    const imageName = randomImageName()

    const params ={
        Bucket : bucketName,
        Key : imageName,
        Body : req.file.buffer,
        ContentType : req.file.mimetype
    }

    const command =  new PutObjectCommand(params)  

    const imageUploadData = await s3.send(command)
    if(imageUploadData){
        return res.json({
            imageUrl : imageName
        })
    }else{
        res.status(402)
        throw new Error("Can't Upload Image")
    }        
})


app.use("/",(req,res)=>{
    res.send("API IS RUNNING!!!!!!1!!")
})


const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.bold))