import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Input from './Input';

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        icon={Lock}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-6"
      >
        {showPassword ? (
          <EyeOff size={20} style={{ color: '#c2c2c2' }} />
        ) : (
          <Eye size={20} style={{ color: '#c2c2c2' }} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;