import express from 'express';
import {login,newUser,getMyProfile,logout}  from '../controllers/user_controller.js';
import { SingleAvatar } from '../middlewares/multer.js';


const app=  express.Router();

app.post('/new',SingleAvatar,newUser)
app.get('/login', login);   
// Export the router for use in the main server file
app.use(isAuthenticated);
app.get("/me",getMyProfile)
app.get('/logout',logout)
//after here user must be logged in
export default app;