import { validationResult } from "express-validator";
import Loan from "../model/loan.model.js";
import User from "../model/user.model.js";
import asyncHandler from "../utils/async.handler.js";
import ErrorResponse from "../utils/error.response.js";
import ApiStatusCode from "../utils/api.status.code.js";
import ApiResponse from "../utils/api.response.js";
import sendPushNotification from "../notification/send.push.notification.js";


const applyForLoan = asyncHandler(async(req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const {purposeOfLoan,principalAmount,tenure}= req.body;
    const mobileNumber = req.mobileNumber;
    const user = await  User.findOne({mobileNumber});
    if(!user){
        throw new ErrorResponse(
            ApiStatusCode.notFound,
            `User not found.`
        )
    }
    const loan = await Loan.create({
        requestedBy:user._id,
        purposeOfLoan,
        principalAmount,
        tenure,
    })

    res
    .status(ApiStatusCode.created)
    .json(
        new ApiResponse(
            ApiStatusCode.created,
            `Successfully applied for loan. You will be notified very soon.`,
            loan,
        )
    )
});


const getLoanDetailsByID = asyncHandler(async (req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const {id} = req.params;
    const loanDetails = await Loan.findById(id);
    if(!loanDetails){
        throw new ErrorResponse(
            ApiResponse.notFound,
            `Couldnot found loan details corresponding to ${id}`
        )
    }
    res
    .status(
        ApiStatusCode.ok
    ).json(
        new ApiResponse(
            ApiStatusCode.ok,
            `Successfully got loan details`,
            loanDetails,
        )
    )
});

const updateLoanStatus = asyncHandler(async (req,res)=>{

    const result = validationResult(req);

    if(!result.isEmpty()){
        throw new ErrorResponse(
            ApiStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array()
        )
    }

    const {status} = req.body;
    const {id} = req.params;

    const loan = await Loan.findByIdAndUpdate(
        id,
        {$set:{status}},
        {new:true}
    );

    const user = await User.findById(loan.requestedBy);
    sendPushNotification(user.fcmToken,`Loan Status Update, ${user.firstName}`,`The status of your requested loan updated to ${status}`)

    res
    .status(ApiStatusCode.ok)
    .json(
        new ApiResponse(
            ApiStatusCode.ok,
            `Successfully updated loan status`,
            loan,   
        )
    )
});

export {
    applyForLoan,
    getLoanDetailsByID,
    updateLoanStatus,
}