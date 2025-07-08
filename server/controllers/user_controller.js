// controllers/auth.js

import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js"; // wherever your helper lives
import { Request } from "../models/request.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(`🔐 [Auth] login attempt for username: ${username}`);

  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      console.warn(`⚠️ [Auth] login failed: invalid username ${username}`);
      return res.status(400).json({ message: "INVALID USERNAME" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      console.warn(`⚠️ [Auth] login failed: invalid credentials for username ${username}`);
      return res.status(400).json({ message: "INVALID CREDENTIALS" });
    }

    console.log(`✅ [Auth] login successful for userId: ${user._id}`);
    return sendToken(res, user, 200, "Welcome back");
  } catch (error) {
    console.error(`❌ [Auth] login error for username ${username}:`, error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const newUser = async (req, res) => {
  const { name, username, password, bio, avatar } = req.body;
  console.log(`🆕 [Auth] registration attempt for username: ${username}`);

  try {
    const user = await User.create({
      name,
      username,
      password, // ✅ this will be hashed via your pre-save hook
      bio,
      avatar,
    });

    console.log(`✅ [Auth] registration successful for userId: ${user._id}`);
    return sendToken(res, user, 201, "Hello");
  } catch (error) {
    console.error(`❌ [Auth] registration error for username ${username}:`, error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const getMyProfile = async (req, res) => {
  console.log(`🔍 [Auth] fetching profile for userId: ${req.user?._id}`);
  // req.user should be populated by your auth middleware
  if (!req.user) {
    console.warn(`⚠️ [Auth] getMyProfile failed: not authenticated`);
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  console.log(`🚪 [Auth] logging out userId: ${req.user?._id}`);
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

export const searchUser = async (req, res) => {
  const { name } = req.query;
  console.log(`🔎 [Auth] searchUser query: name=${name}`);
  try {
    const users = await User.find({ name: new RegExp(name, 'i') }).select('name avatar username');
    console.log(`✅ [Auth] searchUser found ${users.length} users for query '${name}'`);
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(`❌ [Auth] searchUser error for query '${name}':`, error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  console.log(`🔔 [Auth] fetching notifications for userId: ${req.user?._id}`);
  try {
    // Find all requests where the current user is the receiver,
    // and populate the sender’s name and avatar
    const requests = await Request
      .find({ receiver: req.user._id })
      .populate('sender', 'name avatar');

    // Map to a simpler response shape
    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        name: sender.name,
        avatar: sender.avatar,
      }
    }));

    console.log(`✅ [Auth] fetched ${allRequests.length} notifications`);
    // Return the list
    return res.status(200).json({
      success: true,
      requests: allRequests,
    });
  } catch (error) {
    console.error('❌ [Auth] getAllNotifications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Could not fetch notifications. Please try again later.',
    });
  }
};
