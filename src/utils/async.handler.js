import ApiStatusCode from "./api.status.code.js";
import ErrorResponse from "./error.response.js";

const asyncHandler = (callback) => async (req,res,next)=>{
    try {
        await callback(req,res,next);
    } catch (error) {
        res.status(
            error.statusCode || ApiStatusCode.internalServerError,
        ).json(
            new ErrorResponse(
                error.statusCode || ApiStatusCode.internalServerError,
                error.message || "Internal server error"
            )
        )
    }
}

export default asyncHandler;