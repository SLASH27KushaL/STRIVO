import mongoose from "mongoose";
import jwt from "jsonwebtoken"


export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            dbName: "Strivo",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error("❗ Error Details:", error.message);
        process.exit(1); // Forcefully exit after logging
    }
};


export const sendToken=(res,user,code,message)=>{
const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
 
return res
.status(code)
.cookie("strivo",token,{
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
}).json({
    success:true,
    message,
})
};





export const emitEvent=(req,event,users,data)=>{
    console.log("emitting event");
}