import {Router} from "express";
import {login,createUser, requestAOtp, verifyOtp, updateUserDetails} from "../controller/user.controller.js";
import { body } from "express-validator";
import auth from "../middleware/auth.middleware.js";


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
);

userRouter.post(
    "/update",
    body("firstName").notEmpty().withMessage("First name cannot be empty"),
    body("firstName").isString().withMessage("First name should be a collection of characters"),
    body("lastName").notEmpty().withMessage("Last name cannot be empty"),
    body("lastName").isString().withMessage("Last name should be a collection of characters"),
    body("gender").notEmpty().withMessage("Please provide your gender"),
    body("gender").isIn(["MALE","FEMALE","OTHER"]).withMessage("Gender has to be either MALE,FEMALE or OTHER"),
    body("dateOfBirth").notEmpty().withMessage("Please provide your date of birth"),
    body("maritalStatus").notEmpty().withMessage("Please provide a marital status"),
    body("maritalStatus").isIn(["MARRIED","UNMARRIED"]).withMessage("Marital status has to be either MARRIED or UNMARRIED"),
    auth,
    updateUserDetails,
);



export default userRouter;