'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';

function TestContent() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.db.getQuestions().then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || isSubmitting) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isSubmitting]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleOptionSelect = (optionId) => {
    const questionId = questions[currentIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctOptionId) score++;
    });
    return score;
  };

  const handleSubmit = async (auto = false) => {
    if (isSubmitting) return;
    if (!auto && !confirm("Are you sure you want to submit? You cannot change answers after submission.")) return;

    setIsSubmitting(true);
    
    const attempt = {
      id: crypto.randomUUID(),
      userId: 'current-user', 
      startedAt: new Date().toISOString(), 
      completedAt: new Date().toISOString(),
      answers,
      score: calculateScore(),
      totalQuestions: questions.length,
      status: 'completed'
    };

    await api.db.submitTest(attempt);
    router.push(`/result/${attempt.id}`);
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><div className="animate-spin text-brand-600 text-4xl">●</div></div>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-ink-200/50 p-5 mb-8 flex items-center justify-between sticky top-20 z-20 transition-all">
        <div className="flex-1 mr-8">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">
            <span>Progress</span>
            <span>{currentIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border font-mono text-lg font-bold shadow-sm transition-colors
          ${timeLeft < 300 
            ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
            : 'bg-white border-ink-200 text-ink-700'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-card border border-ink-100 overflow-hidden mb-8 relative">
        <div className="h-2 w-full bg-brand-50"></div>
        <div className="p-6 sm:p-12">
          <span className="inline-block px-3 py-1 rounded-full bg-ink-100 text-ink-600 text-xs font-bold uppercase tracking-wider mb-6">
            Question {currentIndex + 1}
          </span>
          
          <h2 className="text-xl sm:text-2xl font-bold text-ink-900 leading-snug mb-10">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map(option => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center group relative overflow-hidden
                    ${isSelected 
                      ? 'border-brand-600 bg-brand-100/50 shadow-inner'
                      : 'border-ink-100 bg-white hover:border-brand-200 hover:bg-brand-50 hover:shadow-sm'
                    }`}
                >
                  <div className={`w-7 h-7 rounded-full border-2 mr-5 flex items-center justify-center flex-shrink-0 transition-colors
                    ${isSelected ? 'border-brand-600 bg-brand-600' : 'border-ink-300 group-hover:border-brand-400 bg-white'}`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                  </div>
                  <span className={`text-lg ${isSelected ? 'text-brand-900 font-semibold' : 'text-ink-700 font-medium group-hover:text-ink-900'}`}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="bg-ink-50/50 px-8 py-6 flex justify-between items-center border-t border-ink-100">
           <Button 
             variant="secondary" 
             disabled={currentIndex === 0}
             onClick={() => setCurrentIndex(p => p - 1)}
             className="!rounded-xl"
           >
             ← Previous
           </Button>
           
           {currentIndex === questions.length - 1 ? (
             <Button variant="primary" onClick={() => handleSubmit(false)} className="!px-8 !rounded-xl shadow-brand-500/20">
               Submit Assessment
             </Button>
           ) : (
             <Button onClick={() => setCurrentIndex(p => p + 1)} className="!px-8 !rounded-xl shadow-brand-500/20">
               Next Question →
             </Button>
           )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-sm">
        <h3 className="text-sm font-bold text-ink-500 uppercase tracking-wider mb-4">Question Map</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-10 rounded-lg text-sm font-bold transition-all duration-200
                  ${isCurrent ? 'ring-2 ring-brand-600 ring-offset-2 scale-105 z-10' : ''}
                  ${isAnswered 
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' 
                    : 'bg-ink-50 text-ink-400 border border-ink-100 hover:bg-white hover:border-brand-300 hover:text-brand-600'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TestArena() {
  return (
    <AuthGuard>
      <TestContent />
    </AuthGuard>
  );
}