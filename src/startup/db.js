import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log("Successfully connected to MONGODB!");
    } catch (error) {
        console.error("An error occured while connecting to MONGODB");
        process.exit(1);
    }
}

export default connectDb;