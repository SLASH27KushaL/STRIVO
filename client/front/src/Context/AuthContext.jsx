// src/contexts/AuthContext.js
import React, { createContext, useState, useCallback, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  fetchNotifications: async () => [],
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3000/user",
    withCredentials: true,
  });

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/me");
      setUser(data.success ? data.user : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { username, password });
      if (!data.success) throw new Error(data.message || "Login failed");
      await loadUser();
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!data.success) throw new Error(data.message || "Registration failed");
      // only now loadUser
      await loadUser();
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.get("/logout");
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    const { data } = await api.get("/notifications");
    return data.requests;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, fetchNotifications }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
