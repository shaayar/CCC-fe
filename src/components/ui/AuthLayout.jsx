import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fffae5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;