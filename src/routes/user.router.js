import {Router} from "express";
import {login,createUser, requestAOtp, verifyOtp} from "../controller/user.controller.js";
import { body } from "express-validator";


const userRouter = Router();

// @Public access 
userRouter.post(
    "/login",
    body("mobileNumber").notEmpty().withMessage("Mobile number is required"),
    body("password").notEmpty().withMessage("Password is required"),
    login,
);

userRouter.post(
    "/createAccount",
    body("mobileNumber").notEmpty().withMessage("Mobile number is required"),
    body("password").notEmpty().withMessage("Password is required"),
    createUser,
);


userRouter.post(
    "/requestOtp",
    body("mobileNumber").notEmpty().withMessage("Moble number cannot be empty"),
    requestAOtp,
);

userRouter.post(
    "/verifyOtp",
    body("mobileNumber").notEmpty().withMessage("Mobile number cannot be empty"),
    body("userEnteredOtp").notEmpty().withMessage("OTP cannot be empty"),
    verifyOtp,
)

export default userRouter;