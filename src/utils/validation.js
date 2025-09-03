// Validation Utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateForm = (formData, type = 'login') => {
  const errors = {};

  // Common validations
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (type === 'signup' && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!formData.role) {
    errors.role = 'Please select your role';
  }

  // Signup specific validations
  if (type === 'signup') {
    if (!formData.name) {
      errors.name = 'Full name is required';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};