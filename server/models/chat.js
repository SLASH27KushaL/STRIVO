import mongoose, { Schema, models, Types } from "mongoose";

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  groupChat: {
    type: Boolean,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
}, { timestamps: true });

export const Chat = models.Chat || model("Chat", chatSchema);
