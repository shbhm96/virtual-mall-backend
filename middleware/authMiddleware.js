import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

import dotenv from "dotenv";
import Seller from "../models/seller/sellerModel.js";

dotenv.config()
const protectValidSeller = asyncHandler(async(req,res,next)=>{
    let token;
    console.log(req.headers)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.seller = await Seller.findById(decoded.id).select("-createdAt -isAdmin -url -rentPaid -visitors -updatedAt -aadharNumber -reviews")
            console.log("Token Found")
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized Token, Token Failed")

        }
        
    }
    if(!token){
        res.status(401)
        throw new Error("Not Authorized or Not Token")
    }    
})
const isAdminUser = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        console.log("It is Admin")
        next()
    }else{
        res.status(401)
        throw new Error("Not Authorised as Admin")
    }
}

export {protectValidSeller,isAdminUser}