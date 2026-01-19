'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

export default function Signup() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const err = await signUp(email, password);
    
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full pt-12">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-glass border border-white p-1">
        <div className="bg-white rounded-[20px] p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-ink-900 mb-3 tracking-tight">Join EduQuest</h2>
            <p className="text-ink-500 text-sm font-medium">Start your journey to mastery today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-brand-700 text-sm p-4 rounded-xl border border-brand-100 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink-700 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 bg-ink-50 border border-ink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-500 focus:bg-white transition-all text-ink-900 font-medium placeholder:text-ink-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink-700 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 bg-ink-50 border border-ink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-500 focus:bg-white transition-all text-ink-900 font-medium placeholder:text-ink-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" isLoading={loading} className="w-full justify-center !py-3.5 !text-base !rounded-xl mt-4">
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-ink-500 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-brand-600 hover:text-brand-700 font-bold hover:underline decoration-2 underline-offset-2">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}