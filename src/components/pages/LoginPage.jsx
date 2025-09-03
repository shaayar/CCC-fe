import React from 'react';
import AuthLayout from '../ui/AuthLayout';
import LoginForm from '../forms/LoginForm';

const LoginPage = ({ onSwitchToSignup }) => {
  return (
    <AuthLayout>
      <LoginForm onSwitchToSignup={onSwitchToSignup} />
    </AuthLayout>
  );
};

export default LoginPage;