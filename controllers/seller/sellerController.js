import asyncHandler from "express-async-handler";
import Seller from "../../models/seller/sellerModel.js";

const authSeller = asyncHandler(async(req,res) => {    
    const {email,password} = req.body

    const seller = await Seller.findOne({email})

    if(seller && (await seller.matchPassword(password))){
        return res.json({
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

    return res.send({email,password})
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
    console.log("Create Use112r",user)
    if(seller){
        res.status(201).json({
            _id : ''+seller._id,
            businessName : ''+seller.businessName.toString(),
            businessOwnerName : ''+seller.businessOwnerName.toString(),
            sellerEmail:  ''+seller.sellerEmail.toString(),
            sellerMobile : seller.sellerMobile,
            aadharNumber:seller.aadharNumber,
            url:seller.url,
            isAdmin : seller.isAdmin,
            token : generateToken(seller._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Seller Data")
    }
    console.log("Create seller8   `729")
})


export {authSeller,registerSeller}