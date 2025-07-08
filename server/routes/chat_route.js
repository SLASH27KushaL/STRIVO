import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';

import { attachmentsMulter } from '../middlewares/multer.js';
import { AcceptFriendRequest, addMembers, deleteChat, getChatDetails, GetFriendRequests, getMessages, getMyGroups, leaveGroup, newGroupChat, RejectFriendRequest, removeMembers, renameGroup, searchUser, sendAttachments, SendFriendRequest } from '../controllers/chat_controller.js';

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
router.get('/my/chats', getChatDetails);


router.post('/friend-request', isAuthenticated, SendFriendRequest);
router.put('/friend-request/accept', isAuthenticated, AcceptFriendRequest);
router.put('/friend-request/reject', isAuthenticated, RejectFriendRequest);
router.get('/friend-requests', isAuthenticated, GetFriendRequests);

export default router;