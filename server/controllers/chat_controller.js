import { ALERT, NEW_ATTACHEMENT, NEW_MESSAGE, REFETCH_CHATS, SEND_MESSAGE } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { message, Message } from "../models/message.js";
import { emitEvent } from "../utils/features.js";

// Remove member(s) from a group chat
export const removeMembers = async (req, res, next) => {
  const { userId, chatId } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ success: false, message: "Chat not found" });
  }
  if (!chat.groupChat) {
    return res.status(400).json({ success: false, message: "Not a group chat" });
  }
  // Only creator can remove members
  if (chat.creator.toString() !== req.user.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized to remove members" });
  }

  const userToRemove = await User.findById(userId, "name");
  if (!userToRemove) {
    return res.status(404).json({ success: false, message: "User to remove not found" });
  }

  // Remove the user from members
  chat.members = chat.members.filter(
    m => m.toString() !== userId.toString()
  );
  await chat.save();

  emitEvent(req, ALERT, chat.members, `${userToRemove.name} has been removed from the group`);
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({ success: true, message: "Member removed successfully" });
};

// Leave a group chat
export const leaveGroup = async (req, res, next) => {
  const { chatId } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ success: false, message: "Chat not found" });
  }
  if (!chat.groupChat) {
    return res.status(400).json({ success: false, message: "Not a group chat" });
  }
  // Ensure user is a member
  if (!chat.members.map(m => m.toString()).includes(req.user.toString())) {
    return res.status(403).json({ success: false, message: "You are not a member of this group" });
  }

  // Remove self
  chat.members = chat.members.filter(
    m => m.toString() !== req.user.toString()
  );
  await chat.save();

  emitEvent(req, ALERT, chat.members, `${req.user.name || 'A member'} has left the group`);
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({ success: true, message: "You have left the group" });
};

// Send attachments in a chat
export const sendAttachments = async (req, res, next) => {
  const { chatId } = req.body;
  // Expecting files middleware (e.g., multer) to populate req.files
  if (!req.files || !req.files.length) {
    return res.status(400).json({ success: false, message: "No attachments provided" });
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ success: false, message: "Chat not found" });
  }
  // Ensure sender is in chat
  if (!chat.members.map(m => m.toString()).includes(req.user.toString())) {
    return res.status(403).json({ success: false, message: "Not a member of this chat" });
  }

  // Create a new message with attachments
  const attachments = req.files.map(file => ({
    url: file.path || file.location,
    filename: file.filename
  }));
  const message = await Message.create({
    chat: chatId,
    sender: req.user,
    attachments,
    type: 'attachment',
  });

  // Populate sender and attachments
  await message.populate('sender', 'name avatar');

  emitEvent(req, NEW_ATTACHEMENT, chat.members, {
    message:message,
    chatId
  });

  emitEvent(req,NEW_MESSAGE,chat.members,{
    chatId
  })
  return res.status(200).json({ success: true, message: 'Attachments sent', data: message });
};


export const getChatDetails=async (req,res,next)=>{
  if(req.query.populate=="true"){
  const chat=await Chat.findById(req.params.id).populate("members","name avatar").lean();
  if(!chat){
    return res.status(404).json("chat not found");
  }
  chat.members=chat.members.map(({_id,name,avatar})=>({
    _id,
    name,
    avatar:avatar.url
  }))
  }
  else{
    const chat=await Chat.findById(req.params.id);
    if(!chat){
      return res.status(404).json("chat not found")
    }
  }
};

export const renameGroup=async (req,res,next){
  const chatId=req.params.id;
  const {name}=req.body;
  const chat= await Chat.findById(chatId);
  if(!chat.groupChat){
    return res.status(404).json("THIS IS NOT A GROUP CHAT");
  }
  if(chat.creator.toString()!== req.user.toString()){
    return res.status(404).json("YOU ARE NOT ALLOWED TO DO THIS OPERATION");
  }
  chat.name=name;
  await  chat.save();
  emitEvent(req,REFETCH_CHATS,chat.members);

};

export const deleteChat=async (req,res,next)=>
  {

};
export const getMessages=async (req,res,next)=>{
   const limit=20;
   const chatId=req.params.id;
   const {page=1}=req.query;
   const skip= (page-1)*limit;  
   

   const [messages,totalMessagesCount]= await Promise.all([
    message.find({chat:chatId})
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit)
    .populate("sender","name")
    .lean(),
    message.countDocuments({chat:chatId}),
   ]);

   const totalPages=Math.ceil(totalMessagesCount/limit);

   return res.status(201).json({
    success:true,
    messages:messages.reverse();
    totalPages,
   });
  };


export const searchUser=async (req,res,next)=>{
//conso
};