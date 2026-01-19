'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <header className="fixed w-full top-0 z-40 glass-panel border-b border-white/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3 cursor-pointer group">
         <Image src="/images/logo.webp" alt="Logo" width={150} height={120}  />
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
                <Link href="/login" className="text-sm font-semibold text-ink-600 hover:text-brand-600 transition-colors">Log in</Link>
                <Link href="/signup">
                  <Button variant="primary" className="!py-2.5 !px-5 !text-sm shadow-brand-500/20">Get Started</Button>
                </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};