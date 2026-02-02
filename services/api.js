import { createClient } from '@/utils/supabase/client';
import { SAMPLE_QUESTIONS } from './mockData.js';

const STORAGE_KEYS = {
  USER: 'TestingSpace_user',
  ATTEMPTS: 'TestingSpace_attempts',
};

const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000/');

  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const api = {
  auth: {
    signUp: async (email, password) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getURL()}auth/callback`,
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