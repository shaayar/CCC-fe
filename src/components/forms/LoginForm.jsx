import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import RoleSelector from '../ui/RoleSelector';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import AuthHeader from '../ui/AuthHeader';
import { api, API_ENDPOINTS } from '../../utils/api';
import { validateForm } from '../../utils/validation';

const LoginForm = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async () => {
    const newErrors = validateForm(formData, 'login');
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const result = await api.post(API_ENDPOINTS.LOGIN, formData);
      setToast({ type: 'success', message: 'Login successful! Welcome back.' });
      console.log('Login successful:', result);
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Login failed. Please try again.' });
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
        title="Welcome Back"
        subtitle="Sign in to continue your learning journey"
      />

      <div className="space-y-6">
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
        />

        <RoleSelector
          value={formData.role}
          onChange={(role) => handleChange('role', role)}
          error={errors.role}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#c2c2c2] text-[#ffa21f] focus:ring-[#ffa21f]"
            />
            <span className="text-sm text-[#2d2d2d]">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-[#ffa21f] hover:underline transition-all"
          >
            Forgot password?
          </button>
        </div>

        <Button onClick={handleSubmit} loading={loading}>
          Sign In
        </Button>
      </div>

      <div className="text-center mt-6">
        <span className="text-[#c2c2c2]">Don't have an account? </span>
        <button
          onClick={onSwitchToSignup}
          className="text-[#ffa21f] hover:underline font-medium transition-all"
        >
          Sign up here
        </button>
      </div>
    </>
  );
};

export default LoginForm;