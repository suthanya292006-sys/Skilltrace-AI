import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfileSession,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const active = getCurrentUser();
    setUser(active);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const sessionUser = await loginUser(credentials);
    setUser(sessionUser);
    return sessionUser;
  };

  const register = async (formData) => {
    const newUser = await registerUser(formData);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    const updated = updateUserProfileSession(updatedFields);
    if (updated) {
      setUser(updated);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
