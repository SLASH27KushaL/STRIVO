import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // 1) Get token from cookies
    const token = req.cookies.strivo;
    if (!token) {
      return res.status(401).json({ message: "Please log in to access this resource." });
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }

    // 3) Find user in DB
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found. Please sign up." });
    }

    // 4) Attach user to request and proceed
    req.user = user;
    next();

  } catch (error) {
    // Token expired, malformed, DB errors, etc.
    return res.status(401).json({ message: error.message || "Authentication failed." });
  }
};
