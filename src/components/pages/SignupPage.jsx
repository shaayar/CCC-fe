import React from 'react';
import AuthLayout from '../ui/AuthLayout';
import SignupForm from '../forms/SignupForm';

const SignupPage = ({ onSwitchToLogin }) => {
  return (
    <AuthLayout>
      <SignupForm onSwitchToLogin={onSwitchToLogin} />
    </AuthLayout>
  );
};

export default SignupPage;