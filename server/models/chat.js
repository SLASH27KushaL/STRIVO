// models/chat.js
import mongoose, { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    groupChat: {
      type: Boolean,
      required: true,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Chat =
  mongoose.models.Chat || model("Chat", chatSchema);
