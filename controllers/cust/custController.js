import asyncHandler from "express-async-handler";
import Cust from "../../models/cust/custModel.js";
import generateToken from "../../utils/generateToken.js";

const authCust = asyncHandler(async(req,res) => {    
    const {email,password} = req.body

    const cust = await Cust.findOne({email})

    if(cust && (await cust.matchPassword(password))){
        console.log(cust)
        res.status(200).json({
            _id : cust._id,
            name : cust.name,
            email:cust.email, 
            mobile:cust.mobile,
            token : generateToken(cust._id)
    })        
    }else{
        res.status(401)
        throw new Error ('Invalid email or password')
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

const createCust = asyncHandler(async(req,res) => {

    const {name, email, mobile,password} = req.body
    console.log(name, email, mobile,password)
    

    const custExist = await Cust.findOne({email})

    if(custExist){
        res.status(400)
        throw new Error("User Already Exist")
    }
    const cust = await Cust.create({
        name,
        email, 
        mobile,
        password
    })
    console.log("Create Use112r",cust)
    if(cust){
        res.status(201).json({
            _id : ''+cust._id,
            name : ''+cust.name.toString(),
            email:  ''+cust.email.toString(),
            mobile : cust.mobile,
            password,
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