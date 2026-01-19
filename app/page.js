'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';

export default function Landing() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-20 text-center space-y-12">
      <div className="space-y-6 max-w-4xl relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-200 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
          Premium MCQ Assessment Platform
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-ink tracking-tight leading-[1.1]">
          Master Your Skills with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400 relative">
            Precision Testing
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="text-xl text-ink-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Join thousands of learners enhancing their knowledge through our scientifically designed MCQ assessment platform. Instant feedback, detailed analytics, and timed challenges.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full justify-center pt-4">
        <Button onClick={() => router.push('/signup')} className="!text-lg !px-10 !py-4 !rounded-2xl shadow-xl shadow-brand-600/20 hover:scale-105">Start Your Assessment</Button>
        <Button variant="secondary" onClick={() => router.push('/login')} className="!text-lg !px-10 !py-4 !rounded-2xl hover:bg-white hover:border-brand-200 hover:text-brand-600">Log In to Account</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-6xl text-left">
        {[
          { title: 'Timed Exams', icon: '⏱️', desc: 'Simulate real-world pressure with our strict timing engine designed to test your reflexes.' },
          { title: 'Detailed Analysis', icon: '📊', desc: 'Understand not just what is right, but why the others are wrong with deep dive explanations.' },
          { title: 'Track Progress', icon: '📈', desc: 'Watch your percentile grow as you master new topics and beat your personal bests.' }
        ].map((feat, i) => (
          <div key={i} className="group bg-white p-8 rounded-3xl border border-ink-100 shadow-card hover:shadow-glow hover:border-brand-200 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-2xl mb-6 text-brand-700 relative z-10">
              {feat.icon}
            </div>
            <h3 className="font-bold text-xl text-ink-900 mb-3 relative z-10 group-hover:text-brand-700 transition-colors">{feat.title}</h3>
            <p className="text-ink-500 leading-relaxed relative z-10">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}