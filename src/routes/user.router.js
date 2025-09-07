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


// @Private
userRouter.post(
  "/update",
  body("firstName")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("First name should be a collection of characters"),

  body("lastName")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("Last name should be a collection of characters"),

  body("gender")
    .optional({ checkFalsy: true, nullable: true })
    .isIn(["MALE", "FEMALE", "OTHER"])
    .withMessage("Gender has to be either MALE, FEMALE, or OTHER"),

  body("dateOfBirth")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("Please provide a valid date of birth."),

  body("maritalStatus")
    .optional({ checkFalsy: true, nullable: true })
    .isIn(["MARRIED", "UNMARRIED"])
    .withMessage("Marital status has to be either MARRIED or UNMARRIED"),


  body("email")
    .optional({ checkFalsy: true, nullable: true })
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("panNumber")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 8, max: 12 })
    .withMessage("PAN number should be between 8 to 12 characters")
    .isAlphanumeric()
    .withMessage("PAN number should only contain letters and numbers"),

  auth,
  updateUserDetails,
);




export default userRouter;