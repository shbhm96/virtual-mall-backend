import asyncHandler from "express-async-handler";
import Cust from "../../models/cust/custModel.js";

const authCust = asyncHandler(async(req,res) => {    
    const {customer_email,password} = req.body

    const cust = await Cust.findOne({customer_email})

    if(cust && (await cust.matchPassword(password))){
        return res.json({
            _id : cust._id,
            customer_name : cust.customer_name,
            customer_email:cust.customer_email,
            customer_mobile:cust.customer_mobile,
            isAdmin : cust.isAdmin,
            token : generateToken(cust._id)
        })        
    }else{
        res.status(401)
        throw new Error ('Invalid email or password')
    }

    res.send({email,password})
})

const getCustProfile = asyncHandler(async(req,res) => {
    const cust = await Cust.findById(req.user._id)

    if(cust ){
        res.json({
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

    res.send({email,password})
})

const createCust = asyncHandler(async(req,res) => {

    const {customer_name, customer_email, customer_mobile} = req.body
    console.log(customer_name, customer_email, customer_mobile)
    

    const custExist = await Cust.findOne({customer_email})

    if(custExist){
        res.status(400)
        throw new Error("User Already Exist")
    }
    const cust = await Cust.create({
        customer_name,
        customer_email, 
        customer_mobile
    })
    console.log("Create Use112r",cust)
    if(cust){
        res.status(201).json({
            _id : ''+cust._id,
            customer_name : ''+cust.customer_name.toString(),
            customer_email:  ''+cust.customer_email.toString(),
            customer_mobile : cust.customer_mobile,
            isAdmin : cust.isAdmin,
            token : generateToken(cust._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
    console.log("Create User8   `729")
})


export {authCust,createCust,getCustProfile}