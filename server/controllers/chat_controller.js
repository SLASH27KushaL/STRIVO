import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import { emitEvent } from "../utils/features.js";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (should be in a separate config file)
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Remove member(s) from a group chat
export const removeMembers = async (req, res, next) => {
  try {
    const { userId, chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    if (!chat.groupChat) {
      return res.status(400).json({ success: false, message: "Not a group chat" });
    }
    if (chat.creator.toString() !== req.user.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to remove members" });
    }

    const userToRemove = await User.findById(userId, "name");
    if (!userToRemove) {
      return res.status(404).json({ success: false, message: "User to remove not found" });
    }

    chat.members = chat.members.filter(m => m.toString() !== userId.toString());
    await chat.save();

    emitEvent(req, ALERT, chat.members, `${userToRemove.name} has been removed from the group`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({ success: true, message: "Member removed successfully" });
  } catch (error) {
    next(error);
  }
};

// Leave a group chat
export const leaveGroup = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    if (!chat.groupChat) {
      return res.status(400).json({ success: false, message: "Not a group chat" });
    }
    
    const user = await User.findById(req.user);
    if (!chat.members.map(m => m.toString()).includes(req.user.toString())) {
      return res.status(403).json({ success: false, message: "You are not a member of this group" });
    }

    chat.members = chat.members.filter(m => m.toString() !== req.user.toString());
    await chat.save();

    emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({ success: true, message: "You have left the group" });
  } catch (error) {
    next(error);
  }
};

// Send attachments in a chat
export const sendAttachments = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No attachments provided" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    
    if (!chat.members.map(m => m.toString()).includes(req.user.toString())) {
      return res.status(403).json({ success: false, message: "Not a member of this chat" });
    }

    const attachments = req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
    }));

    const message = await Message.create({
      chat: chatId,
      sender: req.user,
      attachments,
      type: 'attachment',
    });

    const populatedMessage = await Message.populate(message, {
      path: 'sender',
      select: 'name avatar',
    });

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
      message: populatedMessage,
      chatId
    });

    emitEvent(req, NEW_MESSAGE, chat.members, { chatId });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Attachments sent', 
      data: populatedMessage 
    });
  } catch (error) {
    next(error);
  }
};

// Get chat details
export const getChatDetails = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const populate = req.query.populate === "true";

    let chat;
    if (populate) {
      chat = await Chat.findById(chatId)
        .populate("members", "name avatar")
        .lean();

      if (!chat) {
        return res.status(404).json({ success: false, message: "Chat not found" });
      }

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar?.url,
      }));
    } else {
      chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ success: false, message: "Chat not found" });
      }
    }

    return res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

// Rename group chat
export const renameGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    if (!chat.groupChat) {
      return res.status(400).json({ success: false, message: "Not a group chat" });
    }
    if (chat.creator.toString() !== req.user.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to rename group" });
    }

    chat.name = name;
    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({ 
      success: true, 
      message: "Group renamed successfully",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

// Delete files from Cloudinary
export const deleteFromCloudinary = async (public_ids) => {
  if (!public_ids || public_ids.length === 0) return;
  
  try {
    await cloudinary.api.delete_resources(public_ids);
  } catch (error) {
    console.error("Error deleting files from Cloudinary:", error);
  }
};

// Delete chat
export const deleteChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    
    const userIsCreator = chat.creator.toString() === req.user.toString();
    if (!userIsCreator) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to delete this chat" 
      });
    }

    const messagesWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] }
    });

    const public_ids = [];
    messagesWithAttachments.forEach(({ attachments }) => {
      attachments.forEach(({ public_id }) => {
        public_ids.push(public_id);
      });
    });

    await Promise.all([
      deleteFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// Get chat messages
export const getMessages = async (req, res, next) => {
  try {
    const limit = 20;
    const chatId = req.params.id;
    const { page = 1 } = req.query;
    const skip = (page - 1) * limit;  

    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "name avatar")
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / limit);

    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// Search users
export const searchUser = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === "") {
      return res.status(200).json({ success: true, users: [] });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } }
      ]
    }).select("-password").limit(10);

    return res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};