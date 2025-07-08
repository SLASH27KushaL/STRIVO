// models/message.js
import mongoose, { Schema, model } from "mongoose";

const attachmentSchema = new Schema(
  {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false } // don’t need subdocument IDs here
);

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    attachments: [attachmentSchema],
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message || model("Message", messageSchema);
