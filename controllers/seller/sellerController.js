import asyncHandler from "express-async-handler";
import Seller from "../../models/seller/sellerModel.js";
import generateToken from "../../utils/generateToken.js";
import Order from "../../models/cust/orderModel.js";

const authSeller = asyncHandler(async(req,res) => {    
    const {email,password} = req.body

    const seller = await Seller.findOne({sellerEmail:email})

    if(seller && (await seller.matchPassword(password))){
        return res.status(201).json({
            _id : seller._id,
            businessName:seller.businessName,
            sellerEmail:seller.sellerEmail, 
            businessOwnerName:seller.businessOwnerName,           
            mobile:seller.mobile,
            aadharNumber:seller.aadharNumber,
            url:seller.url,
            token : generateToken(seller._id)
        })        
    }else{
        res.status(401)
        throw new Error ('Invalid email or password')
    }
})
const getSellerDetails = asyncHandler((req,res)=>{
    const {id} = req.params.id
    const seller = Seller.findById(id)
    if(seller){
        return res.status(201).json({
            _id : seller._id,
            businessName:seller.businessName,
            sellerEmail:seller.sellerEmail, 
            businessOwnerName:seller.businessOwnerName,           
            mobile:seller.mobile,
            aadharNumber:seller.aadharNumber,
            url:seller.url,
            token : generateToken(seller._id)
        })
    }else{
        res.status(401)
        throw new Error ('Invalid Seller Id')   
    }
})

const registerSeller = asyncHandler(async(req,res) => {
    const {businessName, sellerEmail,businessOwnerName,password,sellerMobile,aadharNumber} = req.body   
    const sellerExist = await Seller.findOne({sellerEmail})
    if(sellerExist){
        res.status(400)
        throw new Error("User Already Exist")
    }
    const seller = await Seller.create({
        businessName, sellerEmail,businessOwnerName,password,sellerMobile,aadharNumber
    })
    if(seller){
        console.log("Create seller8   `729")
        return res.status(201).json({
            _id : ''+seller._id,
            businessName : ''+seller.businessName.toString(),
            businessOwnerName : ''+seller.businessOwnerName.toString(),
            sellerEmail:  ''+seller.sellerEmail.toString(),
            sellerMobile : seller.sellerMobile,
            aadharNumber:seller.aadharNumber,
            url:seller.url && seller.url,
            isAdmin : seller.isAdmin,
            token : generateToken(seller._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Seller Data")
    }
})

const getSellerCustomers = asyncHandler(async(req,res)=>{
    const customers = await Order.find({seller : req.seller._id}).populate("cust")
                        .select("name email mobile")
    if(customers){
        if(length(customers)===0){
            res.status(301)
            throw new Error("Seller Does't  have any Customer Yet!")
        }
        return res.json(customers)
    }else{
        res.status(401)
        throw new Error("Seller Does't Exist")
    }  
})

const sellerDetails = asyncHandler(async(req,res)=>{
    const seller = await Seller.findById(req.params.id).select("-password")
    if(seller){
        return res.status(201).json({
            _id : seller._id,
            businessName:seller.businessName,
            sellerEmail:seller.sellerEmail, 
            businessOwnerName:seller.businessOwnerName,           
            mobile:seller.mobile,
            aadharNumber:seller.aadharNumber,
            url:seller.url,
            token : generateToken(seller._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid Url!!!")
    }
})

const getAllOrders = asyncHandler(async(req,res)=>{
    console.log("HElloWondw;")
    const orders = await Order.find({seller : req.seller._id})
    if(orders){
        return res.json(orders)
    }else{
        res.status(401)
        throw new Error("Seller Does't Exist")
    }
})

const amountPaid = asyncHandler(async(req,res)=>{
    const order = await Order.find({$and:[{seller : req.seller._id},{_id:req.params.id}]})
    if(order){
        if(order.isPaid){
            es.status(301)
            throw new Error("Order Already Paid!!")
        }
            order.isPaid = true
            order.paidAt = Date.now()

            const updatedOrder = await order.save()

            res.json(updatedOrder)
    }else{
        res.status(401)
        throw new Error("Order Not Found!!")
    }
})

const orderDelivered = asyncHandler(async(req,res)=>{
    const order = await Order.find({$and:[{seller : req.seller._id},{_id:req.params.id}]})
    if(order){
        if(order.isPaid){
            es.status(301)
            throw new Error("Order Already Delivered!!")
        }
            order.isDelivered = true
            order.DeliveredAt = Date.now()

            const updatedOrder = await order.save()

            res.json(updatedOrder)
    }else{
        res.status(401)
        throw new Error("Order Not Found!!")
    }
})


export {
    authSeller,
    registerSeller,
    getSellerCustomers,
    getAllOrders,
    amountPaid,
    orderDelivered,
    sellerDetails
}