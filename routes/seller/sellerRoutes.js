import express from "express";
import { 
    authSeller, 
    registerSeller 
} from "../../controllers/seller/sellerController.js";

const router = express.Router()

router.post("/login",authSeller)
router.post("/register",registerSeller)


export default router