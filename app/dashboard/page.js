'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';

function DashboardContent() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    api.db.getHistory().then(setHistory);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-brand-600/25">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">Hello, {user?.full_name} 👋</h1>
          <p className="text-brand-50 max-w-xl text-lg font-medium leading-relaxed opacity-90">
            Ready to challenge yourself today? Your next level of mastery is just one assessment away.
          </p>
          <div className="mt-8">
            <Button 
              className="bg-white !text-brand-700 hover:!bg-brand-50 border-0 shadow-lg shadow-black/10 !px-8 !py-3 !rounded-xl"
              onClick={() => router.push('/test')}
            >
              Start New Assessment
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
          <div className="p-6 border-b border-ink-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink-900">Recent Attempts</h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-400 bg-ink-50 px-2 py-1 rounded-md">History</span>
          </div>
          <div className="divide-y divide-ink-50">
            {history.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-ink-50 rounded-full flex items-center justify-center text-3xl mb-4 text-ink-300">📝</div>
                <p className="text-ink-500 font-medium">No attempts yet. Start your first test!</p>
              </div>
            ) : (
              history.map((attempt) => (
                <div key={attempt.id} className="p-5 flex items-center justify-between hover:bg-brand-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold
                      ${(attempt.score / attempt.totalQuestions) >= 0.6 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-brand-100 text-brand-700'}`}>
                      {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                    </div>
                    <div>
                      <div className="font-bold text-ink-900 group-hover:text-brand-700 transition-colors">General Assessment</div>
                      <div className="text-xs font-medium text-ink-400">{new Date(attempt.startedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-bold uppercase tracking-wider text-ink-400">Score</div>
                      <div className="text-sm font-bold text-ink-700">{attempt.score}/{attempt.totalQuestions}</div>
                    </div>
                    <Button variant="secondary" className="!py-2 !px-4 !text-xs !rounded-lg" onClick={() => router.push(`/result/${attempt.id}`)}>
                      View Analysis
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 h-fit">
          <h2 className="text-xl font-bold text-ink-900 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-brand-50 border border-brand-100 p-5 rounded-2xl text-center hover:shadow-sm transition-shadow">
                <div className="text-4xl font-extrabold text-brand-600 mb-1">{history.length}</div>
                <div className="text-xs font-bold text-brand-800 uppercase tracking-wider opacity-60">Total Tests</div>
             </div>
             <div className="bg-ink-50 border border-ink-100 p-5 rounded-2xl text-center hover:shadow-sm transition-shadow">
                <div className="text-4xl font-extrabold text-ink-700 mb-1">
                  {history.length > 0 ? Math.max(...history.map(h => Math.round((h.score/h.totalQuestions)*100))) : 0}<span className="text-2xl align-top">%</span>
                </div>
                <div className="text-xs font-bold text-ink-600 uppercase tracking-wider opacity-60">Best Score</div>
             </div>
          </div>
          <div className="mt-8 p-4 bg-gradient-to-br from-brand-50 to-white rounded-xl border border-brand-100/50">
            <p className="text-sm text-ink-600 leading-relaxed font-medium">
              <span className="block text-brand-600 font-bold mb-1">Pro Tip:</span>
              Reviewing your incorrect answers increases retention by up to 40%. Check your analysis after every test.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}