import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = { id: decoded.id }; // Attach user ID to req.user
    next();
  } catch (err) {
    console.error('isAuthenticated error:', err);
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};