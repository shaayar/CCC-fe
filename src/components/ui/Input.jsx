import React from 'react';
import { XCircle } from 'lucide-react';

const Input = ({ label, error, icon: Icon, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-[#2d2d2d]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#c2c2c2]" />
        )}
        <input
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} border rounded-lg focus:ring-2 focus:ring-[#ffa21f] focus:border-[#ffa21f] transition-colors ${error ? 'border-red-500' : 'border-[#c2c2c2]'
            }`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <XCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;