import React, { useState } from 'react';
import { Mail, LogIn } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';
import RoleSelector from '../ui/RoleSelector';
import Toast from '../ui/Toast';
import { api } from '../../utils/api';
import { validateLoginForm } from '../../utils/validation';

const LoginForm = ({ onSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    ambassadorId: '',
    instituteId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setFieldErrors({});

    // Validate form
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const { response, data } = await api.login(formData);

      if (response.ok) {
        setSuccess('Login successful!');
        if (onSuccess) onSuccess(data);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <Toast message={error} type="error" />
      <Toast message={success} type="success" />

      <div className="space-y-6">
        <RoleSelector
          selectedRole={formData.role}
          onRoleChange={(role) => handleInputChange('role', role)}
        />

        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          required
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email"
          error={fieldErrors.email}
        />

        <PasswordInput
          label="Password"
          required
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Enter your password"
          error={fieldErrors.password}
        />

        {/* Ambassador ID Field */}
        {formData.role === 'campus_ambassador' && (
          <Input
            label="Ambassador ID"
            required
            value={formData.ambassadorId}
            onChange={(e) => handleInputChange('ambassadorId', e.target.value)}
            placeholder="Enter your ambassador ID"
            error={fieldErrors.ambassadorId}
          />
        )}

        {/* Institute ID Field */}
        {formData.role === 'institute' && (
          <Input
            label="Institute ID"
            required
            value={formData.instituteId}
            onChange={(e) => handleInputChange('instituteId', e.target.value)}
            placeholder="Enter your institute ID"
            error={fieldErrors.instituteId}
          />
        )}

        <div className="space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const response = await api.googleAuth({
                    credential: credentialResponse.credential,
                    role: formData.role
                  });
                  if (response.data) {
                    setSuccess('Google authentication successful!');
                    if (onSuccess) onSuccess(response.data);
                  }
                } catch (error) {
                  setError('Google authentication failed. Please try again.');
                }
              }}
              onError={() => {
                setError('Google authentication failed. Please try again.');
              }}
              useOneTap
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="rectangular"
              logo_alignment="left"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p style={{ color: '#2d2d2d' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="font-medium hover:underline"
            style={{ color: '#ffa21f' }}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;