import asyncHandler from "express-async-handler";
import generateToken from "../../utils/generateToken.js";
import Product from "../../models/seller/productModel.js";

const getProductDetails = asyncHandler(async(req,res) => {    
    const product = await Product.findById(req.params.id)

    if(product){
        console.log(product)
        return res.json(product)        
    }else{
        res.status(401)
        throw new Error ("Product Not Found")
    } 
})

const getCustProfile = asyncHandler(async(req,res) => {
    const cust = await Cust.findById(req.user._id)

    if(cust ){
        return res.status(201).send({
            _id : cust._id,
            customer_name : cust.customer_name,
            customer_email:cust.customer_email,
            customer_mobile:cust.customer_mobile,
            isAdmin : cust.isAdmin,
            token : generateToken(cust._id)
        })        
    }else{
        res.status(404)
        throw new Error ('Customer Not Found')
    }
})

export {getProductDetails}