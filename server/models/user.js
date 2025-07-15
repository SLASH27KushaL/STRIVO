import mongoose, { Schema } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
    default: "", // Optional bio field
  },
  avatar: {
    public_id: {
      type: String,
      required: false, // Make optional
      default: "", // Default to empty string
    },
    url: {
      type: String,
      required: false, // Make optional
      default: "", // Default to empty string
    },
  },
}, { timestamps: true });

// Hash password only if it has been modified
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);