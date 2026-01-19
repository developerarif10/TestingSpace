'use client';

import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-70 disabled:cursor-not-allowed text-sm active:scale-[0.98]";
  
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 focus:ring-brand-100 border border-transparent",
    secondary: "bg-white text-ink-800 hover:bg-brand-50 border border-ink-200 hover:border-brand-200 focus:ring-brand-100 shadow-sm",
    outline: "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus:ring-brand-100",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 focus:ring-red-100",
    ghost: "bg-transparent text-ink-600 hover:text-brand-600 hover:bg-brand-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : children}
    </button>
  );
};