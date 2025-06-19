import { Schema, model, models } from "mongoose";

const request_Schema = new Schema({
 
  status: {
    type:String,
    default:"pending",
   enum:["pending","accepted","rejected"]
},
   
sender: {
  type:Type.ObjectId,
  ref:"User"
  },
  receiver:{
  type:ObjectId,
  ref:"chat"
  }
}, { timestamps: true });

export const request = models.request || model("User", request_Schema);
 