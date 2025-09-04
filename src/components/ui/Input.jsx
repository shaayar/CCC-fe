import React from 'react';

const Input = ({
  label,
  icon: Icon,
  error,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: '#12122b' }}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={20}
            style={{ color: '#c2c2c2' }}
          />
        )}
        <input
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          style={{ borderColor: error ? '#ef4444' : '#c2c2c2' }}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;