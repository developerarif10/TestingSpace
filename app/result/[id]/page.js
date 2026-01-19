'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import AuthGuard from '../../../components/AuthGuard';
import { api } from '../../../services/api';
import { Button } from '../../../components/ui/Button';

function ResultContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const history = await api.db.getHistory();
      const found = history.find(h => h.id === id);
      
      if (found) {
        setAttempt(found);
      }
      
      const qs = await api.db.getQuestions();
      setQuestions(qs);
      setLoading(false);
    };
    if (id) loadData();
  }, [id]);

  if (loading) return <div className="text-center py-20 flex flex-col items-center"><div className="animate-spin text-brand-600 text-3xl mb-4">●</div><div className="text-ink-500 font-medium">Calculating results...</div></div>;
  if (!attempt) return <div className="text-center py-20 text-ink-500">Result not found.</div>;

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="bg-white rounded-[2rem] shadow-card border border-ink-100 p-8 w-full md:w-5/12 text-center relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600"></div>
          <h2 className="text-ink-500 font-bold uppercase tracking-widest text-xs mb-6">Assessment Score</h2>
          <div className="relative inline-block mx-auto mb-4">
            <div className={`text-7xl font-extrabold tracking-tighter ${percentage >= 60 ? 'text-brand-600' : 'text-red-500'}`}>
              {percentage}%
            </div>
          </div>
          <div className="text-2xl font-bold text-ink-900 mb-8">
            {attempt.score} <span className="text-ink-400 font-medium text-lg">/ {attempt.totalQuestions} Correct</span>
          </div>
          <Button className="w-full !rounded-xl !py-3.5 shadow-brand-500/20" onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
        </div>

        <div className="w-full md:w-7/12 flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-6 flex-grow">
             <div className="bg-green-50/50 border border-green-100 p-6 rounded-[2rem] flex flex-col justify-center items-center text-center">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-3">✓</div>
               <div className="text-green-800 text-3xl font-extrabold mb-1">{attempt.score}</div>
               <div className="text-green-700/70 text-sm font-bold uppercase tracking-wider">Correct</div>
             </div>
             <div className="bg-brand-50/50 border border-brand-100 p-6 rounded-[2rem] flex flex-col justify-center items-center text-center">
               <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-2xl mb-3">✕</div>
               <div className="text-brand-800 text-3xl font-extrabold mb-1">{attempt.totalQuestions - attempt.score}</div>
               <div className="text-brand-700/70 text-sm font-bold uppercase tracking-wider">Incorrect</div>
             </div>
           </div>
           
           <div className="bg-gradient-to-br from-ink-800 to-ink-900 text-white p-8 rounded-[2rem] shadow-xl shadow-ink-900/10 flex-grow flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <div className="relative z-10">
               <div className="text-brand-200 font-bold uppercase tracking-wider text-xs mb-2">Performance Insight</div>
               <p className="text-lg font-medium leading-relaxed text-white/90">
                 {percentage >= 80 ? 'Outstanding performance! You demonstrate strong mastery of these concepts.' : 
                  percentage >= 60 ? 'Solid effort. Reviewing the detailed explanations below will bridge the gap to mastery.' :
                  'This is a learning opportunity. Analyze the incorrect answers below to build a stronger foundation.'}
               </p>
             </div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4 py-4">
        <h2 className="text-2xl font-bold text-ink-900">Detailed Analysis</h2>
        <div className="h-px bg-ink-100 flex-grow"></div>
      </div>
      
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userAnswerId = attempt.answers[q.id];
          const isCorrect = userAnswerId === q.correctOptionId;
          const isSkipped = !userAnswerId;

          return (
            <div key={q.id} className={`rounded-2xl border transition-all duration-300 overflow-hidden
              ${isCorrect ? 'border-ink-100 bg-white shadow-sm' : 'border-brand-200 bg-white shadow-md shadow-brand-900/5'}`}>
              
              {!isCorrect && <div className="bg-brand-50 border-b border-brand-100 px-6 py-2 text-xs font-bold text-brand-700 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span> Needs Review
              </div>}
              
              <div className="p-6 sm:p-8">
                <div className="flex gap-5">
                  <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm
                    ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'}`}>
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                     <p className="text-xl font-semibold text-ink-900 mb-6 leading-snug">{q.text}</p>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                       {q.options.map(opt => {
                         const isSelected = userAnswerId === opt.id;
                         const isIsTheCorrectOne = q.correctOptionId === opt.id;
                         
                         let style = "border-ink-100 bg-ink-50/50 text-ink-500";
                         let icon = null;
                         
                         if (isIsTheCorrectOne) {
                           style = "bg-green-50 border-green-200 text-green-800 ring-1 ring-green-500/20 font-medium shadow-sm";
                           icon = <span className="text-green-600 ml-2">✓</span>;
                         }
                         else if (isSelected && !isCorrect) {
                           style = "bg-brand-50 border-brand-200 text-brand-800 ring-1 ring-brand-500/20 font-medium";
                           icon = <span className="text-brand-600 ml-2">✕</span>;
                         }

                         return (
                           <div key={opt.id} className={`px-4 py-3 rounded-xl border text-sm flex items-center justify-between transition-colors ${style}`}>
                             <span>{opt.text}</span>
                             {icon}
                           </div>
                         )
                       })}
                     </div>
                     
                     {!isCorrect && (
                       <div className="bg-[#f8f9fa] border-l-4 border-brand-500 rounded-r-xl p-5">
                         <div className="text-ink-900 font-bold text-sm mb-2 flex items-center gap-2">
                           <span className="bg-brand-100 text-brand-700 p-1 rounded-md">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </span>
                           Explanation
                         </div>
                         <p className="text-ink-600 text-sm leading-relaxed">{q.explanation}</p>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Result() {
  return (
    <AuthGuard>
      <ResultContent />
    </AuthGuard>
  );
}