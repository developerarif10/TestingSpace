'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthCodeError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            There was a problem signing you in with the provided link.
          </p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
          <p className="text-red-700 text-sm font-medium">
             {error || 'Invalid or expired authentication code.'}
          </p>
        </div>

        <div className="mt-6">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
             Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
