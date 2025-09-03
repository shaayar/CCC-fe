import React from 'react';
import { User } from 'lucide-react';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-[#12122b] rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-[#12122b] mb-2">{title}</h1>
      <p className="text-[#c2c2c2]">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;