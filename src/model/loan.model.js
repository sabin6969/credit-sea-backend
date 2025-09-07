import mongoose from "mongoose";


const loanSchema = new mongoose.Schema({
    requestedBy:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        require:true,
    },
    purposeOfLoan:{
        type:String,
        require:true,
        enum:[ "Personal Loan","Educational Loan","Vehicle Loan","Home Loan"]
    },
    principalAmount:{
        type:Number,
        require:true,
    },
    tenure:{
        type:Number,
        require:true,
    },
    status:{
        type:String,
        enum:["Application Submitted","Application under Review","E-KYC","E-Nach","E-Sign","Disbursement"],
        require:true,
        default:"Application Submitted"
    }
});


const Loan = mongoose.model("Loan",loanSchema);

export default Loan;