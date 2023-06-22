import express from "express";
import { isAdminUser, protectValidSeller } from "../../middleware/authMiddleware.js";
import { 
    createProduct, 
    deleteProduct, 
    updateProduct, 
    getSellerProduct 
} from "../../controllers/seller/productController.js";

const router = express.Router({mergeParams:true})
router.get("/getProducts",protectValidSeller,getSellerProduct)
router.get("/product/create",protectValidSeller,isAdminUser,createProduct)
router.put("/update/:id",protectValidSeller,isAdminUser,updateProduct)
router.delete("/deleteProduct/:id",protectValidSeller,isAdminUser,deleteProduct)    


export default router