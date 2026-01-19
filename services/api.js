import { createClient } from '@/utils/supabase/client';
import { SAMPLE_QUESTIONS } from './mockData.js';

const STORAGE_KEYS = {
  USER: 'TestingSpace_user',
  ATTEMPTS: 'TestingSpace_attempts',
};

export const api = {
  auth: {
    signUp: async (email, password) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      console.log("Signup response:", { data, error });
      return { user: data.user, error: error?.message };
    },
    
    signIn: async (email, password) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { user: data.user, error: error?.message };
    },
    
    signOut: async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
    
    getSession: async () => {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      return session?.user || null;
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