import express from 'express';
import dotenv from 'dotenv';
import user_Route from './routes/user_route.js';
import { connectDB } from './utils/features.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use('/user', user_Route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing or further configuration (optional)
export default app;
