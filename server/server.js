import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import user_Route from './routes/user_route.js';
import { connectDB } from './utils/features.js';
import chat_Route from '../server/routes/chat_route.js'
// Load environment variables from .env
dotenv.config();

const app = express();

// 1) Connect to MongoDB
connectDB(process.env.MONGO_URI);

// 2) Middleware
app.use(express.json());            // parse JSON bodies
app.use(cookieParser());            // parse cookies

// 3) (Optional) CORS setup if your frontend is on a different domain
//    – allow credentials so cookies get sent
//    – replace the origin URL with your actual frontend address
app.use(
  cors({
    origin: '*',  // your frontend URL
    credentials: true,
  })
);

// 4) Routes
app.use('/user', user_Route);
app.use('/chat',chat_Route);

// 5) Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

export default app;
