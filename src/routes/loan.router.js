import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import { applyForLoan, getLoanDetailsByID } from "../controller/loan.controller.js";
import { body, param } from "express-validator";
import mongoose from "mongoose";

const loanRouter = Router();


loanRouter.post(
    "/apply",
    auth,
    body("purposeOfLoan").notEmpty().withMessage("Purpose of loan should be specified"),
    body("principalAmount").notEmpty().withMessage("Principal amount is required"),
    body("principalAmount").isNumeric().withMessage("Principal amout should be numeric"),
    body("tenure").notEmpty().withMessage("Tenure is required"),
    body("tenure").isNumeric().withMessage("tenure amout should be numeric"),
    applyForLoan,
)

loanRouter.get(
    "/:id",
    param("id").custom((id)=>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid loan id");
        }
        return true;
    }), 
    getLoanDetailsByID,
)

export default loanRouter;