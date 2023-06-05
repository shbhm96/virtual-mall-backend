import express from "express";
import { 
    authCust, 
    createCust 
} from "../../controllers/cust/custController.js";

const router = express.Router()

router.route("/login").post(authCust)
router.route("/create").post(createCust)


export default router