import React from 'react';
import { GraduationCap } from 'lucide-react';
import AuthLayout from '../ui/AuthLayout';
import AuthHeader from '../ui/AuthHeader';
import LoginForm from '../forms/LoginForm';

const LoginPage = ({ onSwitchToSignup, onLoginSuccess }) => {
  return (
    <AuthLayout currentPage="login">
      <AuthHeader 
        title="Welcome Back"
        subtitle="Sign in to your learning account"
        icon={GraduationCap}
      />
      <LoginForm 
        onSwitchToSignup={onSwitchToSignup}
        onSuccess={onLoginSuccess}
      />
    </AuthLayout>
  );
};

export default LoginPage;
