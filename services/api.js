import { SAMPLE_QUESTIONS } from './mockData.js';

const STORAGE_KEYS = {
  USER: 'eduquest_user',
  ATTEMPTS: 'eduquest_attempts',
};

export const api = {
  auth: {
    signUp: async (email, password) => {
      await new Promise(r => setTimeout(r, 800)); 
      
      if (email.includes('error')) return { user: null, error: 'User already exists' };
      
      const user = { id: crypto.randomUUID(), email, full_name: email.split('@')[0] };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return { user, error: null };
    },
    
    signIn: async (email, password) => {
      await new Promise(r => setTimeout(r, 800));
      
      if (password.length < 6) return { user: null, error: 'Invalid credentials' };
      
      const user = { id: 'mock-user-id', email, full_name: email.split('@')[0] };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return { user, error: null };
    },
    
    signOut: async () => {
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
    
    getSession: () => {
      // Ensure we are in browser environment before accessing localStorage
      if (typeof window === 'undefined') return null;
      
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    }
  },

  db: {
    getQuestions: async () => {
      await new Promise(r => setTimeout(r, 500));
      return SAMPLE_QUESTIONS;
    },

    submitTest: async (attempt) => {
      await new Promise(r => setTimeout(r, 1000));
      if (typeof window !== 'undefined') {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '[]');
        history.push(attempt);
        localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(history));
      }
    },

    getHistory: async () => {
      if (typeof window === 'undefined') return [];
      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '[]');
      return history.reverse(); 
    }
  }
};