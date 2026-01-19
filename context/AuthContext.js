'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const sessionUser = api.auth.getSession();
    setUser(sessionUser);
    setLoading(false);
  }, []);

  const signIn = async (email, pass) => {
    const { user, error } = await api.auth.signIn(email, pass);
    if (user) setUser(user);
    return error;
  };

  const signUp = async (email, pass) => {
    const { user, error } = await api.auth.signUp(email, pass);
    if (user) setUser(user);
    return error;
  };

  const signOut = async () => {
    await api.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};