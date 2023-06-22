import express from "express";
import { 
    authSeller, 
    registerSeller,
    getSellerCustomers,
    getAllOrders,
    amountPaid,
    sellerDetails,
    orderDelivered
} from "../../controllers/seller/sellerController.js";
import { protectValidSeller } from "../../middleware/authMiddleware.js";


const router = express.Router()

router.post("/login",authSeller)
router.post("/register",registerSeller)
router.get("/details/:id",sellerDetails)
router.post("/getCustomers",protectValidSeller,getSellerCustomers)
router.post("/getAllOrders",protectValidSeller,getAllOrders)
router.get("/orderPaid",protectValidSeller,amountPaid)
router.get("/orderDelivered",protectValidSeller,orderDelivered)


export default router