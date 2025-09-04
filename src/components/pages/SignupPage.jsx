import React from 'react';
import { User } from 'lucide-react';
import AuthLayout from '../ui/AuthLayout';
import AuthHeader from '../ui/AuthHeader';
import SignupForm from '../forms/SignupForm';

const SignupPage = ({ onSwitchToLogin, onSignupSuccess }) => {
  return (
    <AuthLayout currentPage="signup">
      <AuthHeader
        title="Create Account"
        subtitle="Join our learning community"
        icon={User}
      />
      <SignupForm
        onSwitchToLogin={onSwitchToLogin}
        onSuccess={onSignupSuccess}
      />
    </AuthLayout>
  );
};

export default SignupPage;