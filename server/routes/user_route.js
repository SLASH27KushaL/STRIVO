import express from 'express';
import { login, newUser, getMyProfile, logout } from '../controllers/user_controller.js';
import { SingleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { getAllNotifications } from '../controllers/notification_controller.js'; // import your notification controller

const app = express.Router();

// Public routes
app.post('/new', SingleAvatar, newUser);
app.get('/login', login);

// Protected routes (require authentication)
app.use(isAuthenticated);

app.get('/me', getMyProfile);
app.get('/logout', logout);

// Notifications route (only after authentication)
app.get('/notifications', getAllNotifications);

export default app;
