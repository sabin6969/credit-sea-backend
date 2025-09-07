import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import { applyForLoan, getLoanDetailsByID, updateLoanStatus } from "../controller/loan.controller.js";
import { body, param } from "express-validator";
import mongoose from "mongoose";

const loanRouter = Router();


loanRouter.post(
    "/apply",
    auth,
    body("purposeOfLoan").notEmpty().withMessage("Purpose of loan should be specified"),
    body("purposeOfLoan").isIn(["Personal Loan","Educational Loan","Vehicle Loan","Home Loan"]).withMessage("Purpose of loan should be of Personan, Educational,Vehicle, Home Loan"),
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
);

loanRouter.post(
    "/:id/update",
    param("id").custom(id=>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error("Invalid id");
        }
        return true;
    }), 
    body("status").notEmpty().withMessage("Please provide a status to update"),
    body("status").isIn(["Application Submitted","Application under Review","E-KYC","E-Nach","E-Sign","Disbursement"]).withMessage("Loan status has to be either Application Submmited, Application under Review, E-KYC, E-Sign, Disbursement"),
    updateLoanStatus,
);

export default loanRouter;