import twilio from "twilio";
import dotnenv from "dotenv";

dotnenv.config();

 
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,

);


export default twilioClient;