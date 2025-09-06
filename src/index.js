import dotenv from "dotenv";
import connectDb from "./startup/db.js";
import app from "./app/app.js";


dotenv.config({path:".env"});


const PORT = process.env.PORT || 5000;

connectDb().then(value=>{
    app.listen(PORT ,()=>{
        console.log(`Server is up and running at Port ${PORT}`);
    })
});