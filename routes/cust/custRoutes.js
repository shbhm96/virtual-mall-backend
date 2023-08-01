import express from "express";
import { 
    authCust, 
    createCust, 
    getCustProfile
} from "../../controllers/cust/custController.js";
import { getProductDetails } from "../../controllers/cust/productController.js";

const router = express.Router()

router.route("/login").post(authCust)
router.route("/create").post(createCust)
router.route("/custdetails").post(getCustProfile)
router.get("/products/getProduct/:id",getProductDetails)



export default router