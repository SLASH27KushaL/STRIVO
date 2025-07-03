import mongoose,{ Schema, models,Types} from "mongoose";

const message_Schema = new Schema({
  
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "chat",
    required:true,
  },
  content:{
    type:String
  }, 
attachments: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }
}, { timestamps: true });

export const message = models.User || mongoose.model("User", message_Schema);
