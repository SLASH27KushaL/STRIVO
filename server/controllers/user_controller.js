// controllers/auth.js

import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/jwt.js"; // wherever your helper lives

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "INVALID USERNAME" });
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "INVALID CREDENTIALS" });
  }

  return sendToken(res, user, 200, "Welcome back");
};

export const newUser = async (req, res) => {
  const { name, username, password, bio, avatar } = req.body;

  const user = await User.create({
    name,
    username,
    password, // ✅ this will be hashed via your pre-save hook
    bio,
    avatar,
  });

  return sendToken(res, user, 201, "Hello");
};

export const getMyProfile = async (req, res) => {
  // req.user should be populated by your auth middleware
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  // Overwrite the token cookie with an expired one
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};



export const searchUser=async (req,res)=>{
      const {name}=req.query;
      try{

      }
      catch(error){
      res.json("message",error.message);
      }
}


