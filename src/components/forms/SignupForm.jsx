import React, { useState } from 'react';
import { Mail, ArrowLeft, Upload, X } from 'lucide-react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';
import RoleSelector from '../ui/RoleSelector';
import Toast from '../ui/Toast';
import { api } from '../../utils/api';
import { validateSignupForm } from '../../utils/validation';

const SignupForm = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    
    // Institute specific
    instituteName: '',
    location: '',
    facultyName: '',
    designation: '',
    
    // Campus ambassador specific
    ambassadorId: '',
    campusName: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setFieldErrors(prev => ({ ...prev, file: '' }));
      } else {
        setError('Please upload an image file (JPG, PNG, etc.)');
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setFieldErrors({});

    // Validate form
    const validation = validateSignupForm(formData, uploadedFile);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const { response, data } = await api.signup(formData, uploadedFile);

      if (response.ok) {
        setSuccess('Account created successfully! You can now login.');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'student',
          instituteName: '',
          location: '',
          facultyName: '',
          designation: '',
          ambassadorId: '',
          campusName: ''
        });
        setUploadedFile(null);
        if (onSuccess) onSuccess(data);
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto">
      <Toast message={error} type="error" />
      <Toast message={success} type="success" />

      <div className="space-y-6">
        <RoleSelector
          selectedRole={formData.role}
          onRoleChange={(role) => handleInputChange('role', role)}
        />

        {/* Common fields for all roles */}
        <Input
          label={formData.role === 'student' ? 'Full Name' : formData.role === 'institute' ? 'Faculty Full Name' : 'Full Name'}
          required
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder={formData.role === 'institute' ? 'Enter faculty full name' : 'Enter your full name'}
          error={fieldErrors.fullName}
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
          placeholder="Create a password"
          error={fieldErrors.password}
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Confirm your password"
          error={fieldErrors.confirmPassword}
        />

        {/* Institute specific fields */}
        {formData.role === 'institute' && (
          <>
            <Input
              label="Institute Name"
              required
              value={formData.instituteName}
              onChange={(e) => handleInputChange('instituteName', e.target.value)}
              placeholder="Enter institute name"
              error={fieldErrors.instituteName}
            />
            <Input
              label="Location"
              required
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter institute location"
              error={fieldErrors.location}
            />
            <Input
              label="Designation"
              required
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              placeholder="Enter your designation"
              error={fieldErrors.designation}
            />
          </>
        )}

        {/* Campus Ambassador specific fields */}
        {formData.role === 'campus_ambassador' && (
          <>
            <Input
              label="Campus Name"
              required
              value={formData.campusName}
              onChange={(e) => handleInputChange('campusName', e.target.value)}
              placeholder="Enter your campus name"
              error={fieldErrors.campusName}
            />
            <Input
              label="Ambassador ID"
              required
              value={formData.ambassadorId}
              onChange={(e) => handleInputChange('ambassadorId', e.target.value)}
              placeholder="Enter your ambassador ID"
              error={fieldErrors.ambassadorId}
            />
          </>
        )}

        {/* File upload for institutes */}
        {formData.role === 'institute' && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#12122b' }}>
              Institute Proof Document <span className="text-red-500">*</span>
            </label>
            <p className="text-xs mb-3" style={{ color: '#2d2d2d' }}>
              Upload your institute ID card or official document as proof
            </p>

            {!uploadedFile ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:border-orange-300"
                style={{ borderColor: fieldErrors.file ? '#ef4444' : '#c2c2c2' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <Upload size={32} style={{ color: '#c2c2c2' }} />
                  <div>
                    <p className="font-medium" style={{ color: '#12122b' }}>
                      Click to upload document
                    </p>
                    <p className="text-sm" style={{ color: '#2d2d2d' }}>
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="border rounded-lg p-4 flex items-center justify-between" style={{ borderColor: '#c2c2c2' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                    <Upload size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#12122b' }}>
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs" style={{ color: '#2d2d2d' }}>
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            {fieldErrors.file && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.file}</p>
            )}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToLogin}
          className="inline-flex items-center gap-2 text-white hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SignupForm;