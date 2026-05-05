'use client';
import { userAuthStore } from '@/store/authStore';
import { Stethoscope } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const layout = ({ children }) => {
  const { isAuthenticated } = userAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login/patient');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
            <header className='bg-white border-b px-6 py-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                            CARE360
                        </span>
                    </div>
                </div>
            </header>
            <main className='flex-1 flex items-center justify-center p-6'>
                {children}
            </main>
        </div>);

};

export default layout;