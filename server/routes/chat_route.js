import express from 'express';
import { isAuthenticated } from './middlewares/auth.js';
import { addMembers, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, sendAttachments } from '../controllers/chat_controller.js';
import { attachmentsMulter } from '../middlewares/multer.js';


const app=  express.Router();




// Export the router for use in the main server file
app.use(isAuthenticated);
app.post('/new',newGroupChat);
app.get('/my',getMyChats);
app.get('/my/groups',getMyGroups);
app.put('/addMembers',addMembers);
app.put('/removeMember',removeMembers);
app.delete('/leave/:id',leaveGroup);

//send messages

app.post("/message",attachmentsMulter,sendAttachments);

//get messages


//get chat details
 app.route("/chat/:id").get(getChatDetails).put().delete();
//after here user must be logged in
export default app;





