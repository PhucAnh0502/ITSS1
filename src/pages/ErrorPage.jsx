import React from 'react';
import { Home, RefreshCcw } from 'lucide-react';
import { error } from '../assets';

const ErrorPage = () => {
    const goHome = () => {
        window.location.href = '/'; 
    };

    const handleRetry = () => {
        window.location.reload();
    };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        
        <div className="relative mx-auto w-64 h-64 mb-6">
            <img 
                src={error} 
                alt="Sports Error"
                className="w-full h-full object-contain opacity-90 drop-shadow-xl animate-bounce-slow"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 rounded-[50%] blur-md"></div>
        </div>

        <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: '#3313E5' }}>
                Oops!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Something went wrong.
            </h2>
            <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
                An unexpected error has occurred. Please try again later or return to the home page.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button 
                onClick={handleRetry}
                className="w-full sm:w-auto px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
            >
                <RefreshCcw size={20} />
            </button>

            <button 
                onClick={goHome}
                style={{ backgroundColor: '#3313E5' }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-bold shadow-lg hover:opacity-90 hover:scale-105 transition-all transform flex items-center justify-center gap-2"
            >
                <Home size={20} />
                Back to Home Page
            </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;