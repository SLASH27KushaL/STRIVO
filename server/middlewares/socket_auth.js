export const socketAuth = async (socket, next) => {
  try {
    // 1) Get token from cookies
    const token = socket.request.cookies.strivo;
    if (!token) {
      return next(new Error('Please log in to access this resource.'));
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
      return next(new Error('Invalid token. Please log in again.'));
    }

    // 3) Find user in DB
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(new Error('User not found. Please sign up.'));
    }       
  }
  catch (error) {
    console.error('Socket authentication error:', error);
    return next(new Error('Authentication error'));
  }
}