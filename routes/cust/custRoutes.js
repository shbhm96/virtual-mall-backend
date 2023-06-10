import express from "express";
import { 
    authCust, 
    createCust, 
    getCustProfile
} from "../../controllers/cust/custController.js";

const router = express.Router()

router.route("/login").post(authCust)
router.route("/create").post(createCust)
router.route("/custdetails").post(getCustProfile)


export default router