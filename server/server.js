// server.js (or app.js)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import { v4 as uuid } from 'uuid';

import user_Route from './routes/user_route.js';
import chat_Route from './routes/chat_route.js';
import { connectDB } from './utils/features.js';
import { NEW_MESSAGE } from './constants/events.js';
import { Message } from './models/message.js';

export const userSocketIDs = new Map();

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());
// only allow our frontend on port 5173
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/user', user_Route);
app.use('/chat', chat_Route);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
  const { userId, name } = socket.handshake.query;
  if (!userId) {
    socket.disconnect(true);
    return;
  }

  userSocketIDs.set(userId, socket.id);
  console.log(`User ${name || userId} connected on socket ${socket.id}`);

  socket.on(NEW_MESSAGE, async ({ chatId, members, content }) => {
    try {
      members.forEach((memberId) => {
        const memberSocket = userSocketIDs.get(memberId);
        if (memberSocket && memberSocket !== socket.id) {
          io.to(memberSocket).emit(NEW_MESSAGE, {
            chatId,
            message: {
              _id: uuid(),
              content,
              sender: { _id: userId, name },
            },
          });
        }
      });

      await Message.create({
        content,
        sender: userId,
        chat: chatId,
      });

      console.log(`Saved message in chat ${chatId}`);
    } catch (err) {
      console.error('Error handling NEW_MESSAGE:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
    userSocketIDs.delete(userId);
  });
});

export default app;
