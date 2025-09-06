import ApiResponse from "../utils/api.response.js";
import ApiStatusCode from "../utils/api.status.code.js";
import asyncHandler from "../utils/async.handler.js";
import jsonwebtoken from "jsonwebtoken";


const auth = asyncHandler((req,res,next)=>{
    try {
        const token = req.headers.token;
        if(!token){
            res
            .status(ApiStatusCode.badRequest)
            .json(
                new ApiResponse(
                    ApiStatusCode.badRequest,
                    `Error: Auth token is missing.`
                )
            )
            return;
        }
        const decodedData = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        req.mobileNumber = decodedData.mobileNumber;
        next();
    } catch (error) {
        res.status(
            ApiStatusCode.unauthorized,
        ).json(
            new ApiResponse(
                ApiStatusCode.unauthorized,
                `Authentication error: ${error.message}`
            )
        )
    }
});

export default auth;