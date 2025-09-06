import { validationResult } from "express-validator";
import ApiStatusCode from "../utils/api.status.code.js";
import asyncHandler from "../utils/async.handler.js";
import ErrorResponse from "../utils/error.response.js";
import User from "../model/user.model.js";
import ApiResponse from "../utils/api.response.js";
import twilioClient from "../startup/twilio.client.js";
import jsonwebtoken from "jsonwebtoken";



const login = asyncHandler(async(req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const {mobileNumber,password} = req.body;

    
    const user = await User.findOne({mobileNumber});

    if(!user){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `There is no any account associated with "${mobileNumber}" number.`
        )
    }   

    const isPasswordValid = await user.isPasswordValid(password);
    if(!isPasswordValid){
        throw new ErrorResponse(
            ApiStatusCode.unauthorized,
            `Incorrect password entered for "${mobileNumber}"`
        )
    }

    const isMobileNumberVerified = user.isMobileNumberVerified;
    
    if(!isMobileNumberVerified){
        throw new ErrorResponse(
            ApiStatusCode.forbidden,
            `Please verify your mobile number before signup`,
        )
    }

    const jwt = jsonwebtoken.sign({mobileNumber:mobileNumber},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});

    res
    .status(ApiStatusCode.ok)
    .json(
        new ApiResponse(
            ApiResponse.ok,
            `Login successful.`,
            {
                user,
                token:jwt,
            },
        )
    );
});


const createUser = asyncHandler(async (req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }

    const {mobileNumber,password} = req.body;

    const existingUser = await User.findOne({mobileNumber});
    if(existingUser){
        throw new ErrorResponse(
            ApiStatusCode.conflict,
            `User is ${mobileNumber} already exists.Please choose another phone number`,
            [],
        )
    }

    const user = await User.create({mobileNumber,password});
   if(user){
        res
        .status(
            ApiStatusCode.created
        ).json(
            new ApiResponse(
                ApiStatusCode.created,
                `Account creation successful`,
                user,
            )
        )
   }
   else{
    throw new ErrorResponse(
        ApiStatusCode.internalServerError,
        "Something went wrong while creating a account"
    )
   }
    
});


const requestAOtp = asyncHandler(async (req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const {mobileNumber} = req.body;
    const verification = await twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_SID).verifications.create({
        to:mobileNumber,
        channel:"sms",
    });

    res
    .status(ApiStatusCode.ok)
    .json(
        new ApiResponse(
            ApiStatusCode.ok,
            `A 4-digit OTP has been sent to your mobile number ${mobileNumber}. Please enter it to proceed.`
        )
    )
}); 


const verifyOtp = asyncHandler(async (req,res)=>{
    try {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new ErrorResponse(
                ApiStatusCode.badRequest,
                `Validation error: ${result.array().at(0).msg}`,
                result.array(),
            )
        }

    const {mobileNumber, userEnteredOtp} = req.body;

    const verificationCheck = await twilioClient.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
        to:mobileNumber,
        code:userEnteredOtp,
    });


    if(verificationCheck.status==="approved"){
        const user = await User.findOne({mobileNumber});

        if(user){
            user.isMobileNumberVerified = true;
            await user.save();
        }

        res.status(
            ApiStatusCode.ok,
        ).json(
            new ApiResponse(
                ApiStatusCode.ok,
                `OTP verified successfully for ${mobileNumber}.`,
            )
        )
    }
    else{
        res.status(400).json(
            new ErrorResponse(
                ApiStatusCode.badRequest,
                `Failed to verify OTP code for ${mobileNumber}.Please try generating again.`
            )
        );
    }
    } catch (error) {
       res.status(400).json(
            new ErrorResponse(
                ApiStatusCode.badRequest,
                `Failed to verify OTP code for this number. Please try generating again.`
            )
        ); 
    }
});


const updateUserDetails = asyncHandler(async (req,res)=>{

    console.log("Req Received!");
    const result = validationResult(req);

    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }

    const {firstName,lastName,gender,dateOfBirth,maritalStatus} = req.body;

   const user =  await User.findOneAndUpdate({mobileNumber:req.mobileNumber},{$set:{
        firstName,
        lastName,
        gender,
        dateOfBirth,
        maritalStatus,
    }},{new:true}).select("-password");
    
    if(!user){
        throw new ErrorResponse(
            ApiResponse.internalServerError,
            `Something went wrong while updating user's profile`,
        )
    }
    else{
        res
        .status(
            ApiStatusCode.ok
        ).json(
            new ApiResponse(
                ApiStatusCode.ok,
                `Successfully updated profile`,
                user,
            )
        )
    }

});



export {
    login,
    createUser,
    requestAOtp,
    verifyOtp,
    updateUserDetails,
};