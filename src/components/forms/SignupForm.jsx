import React, { useState } from 'react';
import { User, Mail } from 'lucide-react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import RoleSelector from '../ui/RoleSelector';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import AuthHeader from '../ui/AuthHeader';
import { api, API_ENDPOINTS } from '../../utils/api';
import { validateForm } from '../../utils/validation';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async () => {
    const newErrors = validateForm(formData, 'signup');
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      const result = await api.post(API_ENDPOINTS.SIGNUP, signupData);
      setToast({ type: 'success', message: 'Account created successfully! Please sign in.' });
      console.log('Signup successful:', result);
      setTimeout(() => onSwitchToLogin(), 2000);
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AuthHeader
        title="Join Us Today"
        subtitle="Create your account and start learning"
      />

      <div className="space-y-6">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          icon={User}
        />

        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          icon={Mail}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password (min 8 characters)"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
        />

        <RoleSelector
          value={formData.role}
          onChange={(role) => handleChange('role', role)}
          error={errors.role}
        />

        <Button onClick={handleSubmit} loading={loading}>
          Create Account
        </Button>
      </div>

      <div className="text-center mt-6">
        <span className="text-[#c2c2c2]">Already have an account? </span>
        <button
          onClick={onSwitchToLogin}
          className="text-[#ffa21f] hover:underline font-medium transition-all"
        >
          Sign in here
        </button>
      </div>
    </>
  );
};

export default SignupForm;