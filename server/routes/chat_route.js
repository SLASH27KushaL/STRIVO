import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { 
  addMembers, 
  deleteChat, 
  getChatDetails, 
  getMessages, 
  getMyChats, 
  getMyGroups, 
  leaveGroup, 
  newGroupChat, 
  removeMembers, 
  renameGroup, 
  searchUser, 
  sendAttachments 
} from '../controllers/chat_controller.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// Group chat routes
router.post('/group/new', newGroupChat);
router.get('/group/my', getMyGroups);
router.put('/group/addmembers', addMembers);
router.put('/group/removemember', removeMembers);
router.put('/group/rename/:id', renameGroup);
router.delete('/group/leave/:id', leaveGroup);

// Message routes
router.post('/message', attachmentsMulter, sendAttachments);
router.get('/message/:id', getMessages);

// Chat routes
router.route('/chat/:id')
  .get(getChatDetails)
  .delete(deleteChat);

// Search route
router.get('/user/search', searchUser);

// User chats
router.get('/my/chats', getMyChats);

export default router;