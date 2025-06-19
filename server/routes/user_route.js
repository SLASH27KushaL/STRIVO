import express from 'express';
import {login,newUser}  from '../controllers/user_controller.js';
const app=  express.Router();

app.post('/new',newUser)
app.get('/login', login);   
// Export the router for use in the main server file
export default app;