import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', loading = false, className = '', ...props }) => {
  const baseStyles = 'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-[#ffa21f] text-white hover:bg-[#e8921c] focus:ring-2 focus:ring-[#ffa21f] focus:ring-offset-2',
    secondary: 'bg-[#c2c2c2] text-[#2d2d2d] hover:bg-[#b0b0b0] focus:ring-2 focus:ring-[#c2c2c2] focus:ring-offset-2'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;