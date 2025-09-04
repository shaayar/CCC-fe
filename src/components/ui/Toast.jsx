import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Toast = ({ message, type = 'error', onClose }) => {
  if (!message) return null;

  const styles = {
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      icon: AlertCircle,
      iconColor: 'text-red-600'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-700',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    }
  };

  const style = styles[type];
  const IconComponent = style.icon;

  return (
    <div className={`mb-4 p-4 rounded-lg border flex items-center gap-2 ${style.bg}`}>
      <IconComponent size={16} className={style.iconColor} />
      <span className={`text-sm ${style.text}`}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={`ml-auto ${style.text} hover:opacity-75`}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Toast;