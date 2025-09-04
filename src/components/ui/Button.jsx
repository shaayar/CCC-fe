import React from 'react';

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg';

  const variants = {
    primary: 'text-white',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-white hover:bg-opacity-10'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  const getBackgroundColor = () => {
    if (disabled) return '#c2c2c2';
    if (variant === 'primary') return '#ffa21f';
    return '';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={variant === 'primary' ? { backgroundColor: getBackgroundColor() } : {}}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;