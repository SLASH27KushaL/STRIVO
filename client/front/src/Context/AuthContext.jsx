// src/Context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const getSafeUserFromStorage = () => {
  try {
    const userString = localStorage.getItem('user');
    return userString && userString !== 'undefined'
      ? JSON.parse(userString)
      : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(getSafeUserFromStorage);
  const [token, setToken]     = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Create an axios instance for /user routes
  const api = axios.create({ baseURL: 'http://localhost:3000/user' });

  // Attach token to every request
  api.interceptors.request.use(config => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Also sync default axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const handleAuthSuccess = (userObj, jwt) => {
    setUser(userObj);
    setToken(jwt);
    localStorage.setItem('user', JSON.stringify(userObj));
    localStorage.setItem('token', jwt);
  };

  const login = async ({ username, password }) => {
    setLoading(true);
    setError(null);
    try {
      if (!username || !password) throw new Error('Username and password are required');
      const { data } = await api.post('/login', { username, password });
      if (!data.success) throw new Error(data.message || 'Login failed');
      handleAuthSuccess(data.user, data.token);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({
    name,
    username,
    bio,
    email,
    password,
    avatarFile,
  }) => {
    setLoading(true);
    setError(null);
    try {
      if (!name || !username || !email || !password) {
        throw new Error('Name, username, email and password are required');
      }
      const formData = new FormData();
      formData.append('name',     name);
      formData.append('username', username);
      formData.append('bio',      bio || '');
      formData.append('email',    email);
      formData.append('password', password);
      if (avatarFile) formData.append('avatar', avatarFile);

      const { data } = await api.post('/register', formData);
      if (!data.success) throw new Error(data.message || 'Registration failed');
      handleAuthSuccess(data.user, data.token);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Signup failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.get('/logout');
    } catch (_) { /* ignore */ }
    finally {
      setUser(null);
      setToken('');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      return data.requests || [];
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        fetchNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// **Newly added hook** for easy consumption
export const useAuth = () => useContext(AuthContext);
