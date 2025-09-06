import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    firstName:{
        require:false,
        type:String,
    },
    lastName:{
        require:false,
        type:String,
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
    },
    dateOfBirth:{
        type:Number,
        required:false,
    },
    gender:{
        type:String,
        enum:["MALE","FEMALE","OTHER"],
        require:false,
    },
    panNumber:{
        type:String,
        require:false,
    },
    email:{
        type:String,
        require:false,
    },
    password:{
        type:String,
        require:true,
    },
    isMobileNumberVerified:{
        type:Boolean,
        default:false,
    },
    maritalStatus:{
        type:String,
        enum:["MARRIED","UNMARRIED"]
    }
});


// unique email if its type is string
userSchema.index(
    {
        email:1,
    },
    {
        unique:true, partialFilterExpression:{email:{$type:"string"}}
    }
);

// unique email if its type is string
userSchema.index(
    {
        panNumber:1,
    },
    {
        unique:true, partialFilterExpression:{panNumber:{$type:"string"}}
    }
);


userSchema.pre("save", async function(){
    if(this.isModified("password")){
        const encryptPassword = await bcrypt.hash(this.password,5);
        this.password = encryptPassword;
    }
});

userSchema.methods.isPasswordValid = async  function(enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
};




const User = mongoose.model("User",userSchema);

export default User;