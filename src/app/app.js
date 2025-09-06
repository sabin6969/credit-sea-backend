import express from "express";
import userRouter from "../routes/user.router.js";
import asyncHandler from "../utils/async.handler.js";
import ErrorResponse from "../utils/error.response.js";
import ApiStatusCode from "../utils/api.status.code.js";


const app = express();

app.use(express.json());

app.use("/api/user",userRouter);


app.use(asyncHandler((req,res,next)=>{
    throw new ErrorResponse(
        ApiStatusCode.notFound,
        `This route doesnot exists`,
    )
}));


export default app;