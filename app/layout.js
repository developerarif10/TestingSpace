import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import '../styles/globals.css';

export const metadata = {
  title: 'TestingSpace | Master Your Skills',
  description: 'A premium EdTech testing platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    brand: {
                      50: '#fff0f1',
                      100: '#ffe4e4',
                      200: '#fecdd2',
                      300: '#fda4af',
                      400: '#fb7185',
                      500: '#f43f5e',
                      600: '#db3444',
                      700: '#be123c',
                      800: '#9f1239',
                      900: '#881337',
                    },
                    ink: {
                      DEFAULT: '#2c3e50',
                      50: '#f8fafc',
                      100: '#f1f5f9',
                      200: '#e2e8f0',
                      300: '#cbd5e1',
                      400: '#94a3b8',
                      500: '#64748b',
                      600: '#475569',
                      700: '#334155',
                      800: '#2c3e50',
                      900: '#0f172a',
                    }
                  },
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                  },
                  boxShadow: {
                    'glow': '0 0 20px -5px rgba(219, 52, 68, 0.3)',
                    'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                    'card': '0 2px 10px rgba(0,0,0,0.03), 0 10px 25px rgba(0,0,0,0.04)',
                  },
                  backgroundImage: {
                    'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))',
                  }
                }
              }
            }
          `
        }} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.8);
          }
        `}</style>
      </head>
      <body className="bg-[#f8f9fa] text-ink antialiased selection:bg-brand-100 selection:text-brand-900 min-h-screen flex flex-col relative overflow-x-hidden">
        <AuthProvider>
          <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-50 to-transparent pointer-events-none z-0"></div>
          
          <Navbar />
          
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
        </AuthProvider>
      </body>
    </html>
  );
}