import React from 'react';

const Illustration = ({ currentPage }) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="relative mb-8">
        <img src="/undraw_online-community_3o0l.svg" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {currentPage === 'login' ? 'Welcome Back!' : 'Join Our Community'}
      </h3>
      <p className="text-white opacity-80 max-w-sm">
        {currentPage === 'login'
          ? 'Access your personalized learning dashboard and continue your educational journey.'
          : 'Start your learning adventure with thousands of students, institutes, and ambassadors worldwide.'
        }
      </p>
    </div>
  </div>
);

const AuthLayout = ({ children, currentPage = 'login' }) => {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#12122b' }}>
      {/* Illustration - Left side on large screens */}
      <div className="hidden lg:flex lg:w-1/2">
        <Illustration currentPage={currentPage} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Mobile illustration */}
          <div className="lg:hidden mb-8">
            <Illustration currentPage={currentPage} />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;