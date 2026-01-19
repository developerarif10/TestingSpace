import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from './ui/Button.jsx';

export const Layout = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-50 to-transparent pointer-events-none z-0"></div>
      
      <header className="fixed w-full top-0 z-40 glass-panel border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-600/20 group-hover:scale-105 transition-transform duration-300">
              E
            </div>
            <span className="font-bold text-xl tracking-tight text-ink group-hover:text-brand-600 transition-colors">TestingSpace</span>
          </Link>
          
          <nav>
            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-ink-600 hidden sm:block">
                  Hello, <span className="text-ink-900">{user.full_name}</span>
                </span>
                <Button variant="secondary" onClick={handleSignOut} className="!py-2 !px-4 !text-sm !rounded-lg border-ink-200">Sign Out</Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                 <Link to="/login" className="text-sm font-semibold text-ink-600 hover:text-brand-600 transition-colors">Log in</Link>
                 <Link to="/signup">
                   <Button variant="primary" className="!py-2.5 !px-5 !text-sm shadow-brand-500/20">Get Started</Button>
                 </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10">
        {children}
      </main>

      <footer className="bg-white border-t border-ink-100 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-ink-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} TestingSpace. Designed with precision.
          </p>
        </div>
      </footer>
    </div>
  );
};