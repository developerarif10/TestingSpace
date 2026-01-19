'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []); // We can't easily listen to route changes in App Router w/o path check, but clicking links usually unmounts/remounts or we can add close on click.
  // Actually, passing a close handler to Links or just relying on navigation is safer. 
  // But wait, the component might not unmount on soft nav. 
  // Let's add a close on Link click roughly or use a clickable wrapper.

  const handleSignOut = () => {
    signOut();
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      <header className="fixed w-full top-0 z-40 glass-panel border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3 cursor-pointer group relative z-50">
           <Image src="/images/logo.webp" alt="Logo" width={150} height={120} className="w-auto h-8 sm:h-10" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-ink-600">
                  Hello, <span className="text-ink-900">{user.full_name}</span>
                </span>
                <Button variant="secondary" onClick={handleSignOut} className="!py-2 !px-4 !text-sm !rounded-lg border-ink-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200">Sign Out</Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                  <Link href="/login" className="text-sm font-semibold text-ink-600 hover:text-brand-600 transition-colors">Log in</Link>
                  <Link href="/signup">
                    <Button variant="primary" className="!py-2.5 !px-5 !text-sm shadow-brand-500/20 hover:shadow-brand-500/40 transform hover:-translate-y-0.5 transition-all">Get Started</Button>
                  </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-ink-600 hover:text-brand-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-end gap-1.5">
              <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-4 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {user ? (
          <>
            <div className="text-center space-y-2">
              <p className="text-ink-500 text-sm">Signed in as</p>
              <p className="text-xl font-bold text-ink-900">{user.full_name || 'User'}</p>
            </div>
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-ink-600 hover:text-brand-600">
              Dashboard
            </Link>
            <Button 
              variant="secondary" 
              onClick={handleSignOut}
              className="!w-48 !py-3 !text-base border-ink-200 text-red-600 hover:bg-red-50 hover:border-red-200"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
             <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-ink-600 hover:text-brand-600">
              Home
            </Link>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-ink-600 hover:text-brand-600">
              Log in
            </Link>
            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="!w-64 !py-4 !text-lg shadow-xl shadow-brand-500/20">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};