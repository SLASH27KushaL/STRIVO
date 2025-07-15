import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'; // Adjust path as needed

// Helper: generate JWT
const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

// Register a new user
export const newUser = async (req, res) => {
  try {
    // Destructure all fields your front-end is sending
    const { name, username, bio, email, password } = req.body;
    const avatar = req.file ? req.file.path : null; // from your multer SingleAvatar

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, username, email and password are required.',
      });
    }

    // Check username uniqueness
    const exists = await User.findOne({ username });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'Username already in use.' });
    }

    // (Optional) Check email uniqueness
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already registered.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and save user
    const user = await User.create({
      name,
      username,
      bio,
      email,
      password: hash,
      avatar,
    });

    // Issue JWT
    const token = createToken(user._id);

    // Respond with user info (omit password)
    res.status(201).json({
      success: true,
      user: {
        id:       user._id,
        name:     user.name,
        username: user.username,
        bio:      user.bio,
        email:    user.email,
        avatar:   user.avatar,
      },
      token,
    });
  } catch (err) {
    console.error('newUser error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login an existing user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    // Find user + hashed password
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    // Compare
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    // JWT
    const token = createToken(user._id);
    res.json({
      success: true,
      user: {
        id:       user._id,
        name:     user.name,
        username: user.username,
        bio:      user.bio,
        email:    user.email,
        avatar:   user.avatar,
      },
      token,
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get current user's profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({
      success: true,
      user: {
        id:       user._id,
        name:     user.name,
        username: user.username,
        bio:      user.bio,
        email:    user.email,
        avatar:   user.avatar,
      },
    });
  } catch (err) {
    console.error('getMyProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Logout (stateless)
export const logout = async (req, res) => {
  try {
    // If you were using cookies, you'd clear them here.
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    console.error('logout error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Example: fetch all notifications for the user
export const getAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    // Replace with your real notification logic
    const notifications = [];
    res.json({ success: true, requests: notifications });
  } catch (err) {
    console.error('getAllNotifications error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
