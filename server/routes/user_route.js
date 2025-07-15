// routes/user.js
import express from 'express';
import { 
  newUser, 
  login, 
  getMyProfile, 
  logout, 
  getAllNotifications 
} from '../controllers/user_controller.js';
import { SingleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Public (no token required)
// Registration: multipart/form-data for avatar upload
router.post('/register', SingleAvatar, newUser);

// Login: JSON body
router.post('/login', login);

// From here on out, require a valid JWT
router.use(isAuthenticated);

// Get own profile
router.get('/me', getMyProfile);

// Logout (stateless)
router.get('/logout', logout);

// Fetch notifications
router.get('/notifications', getAllNotifications);

export default router;
