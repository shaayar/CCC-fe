export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateAge = (age) => {
  const numAge = parseInt(age);
  return numAge >= 1 && numAge <= 120;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateLoginForm = (formData) => {
  const errors = {};
  const { role } = formData;

  // Common validations for all roles
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(formData.password)) {
    errors.password = 'Password is required';
  }

  if (!validateRequired(role)) {
    errors.role = 'Please select a role';
  }

  // Role-specific validations
  if (role === 'campus_ambassador' && !validateRequired(formData.ambassadorId)) {
    errors.ambassadorId = 'Ambassador ID is required';
  }

  if (role === 'institute' && !validateRequired(formData.instituteId)) {
    errors.instituteId = 'Institute ID is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignupForm = (formData, file = null) => {
  const errors = {};
  const { role } = formData;

  // Common validations for all roles
  const nameField = role === 'institute' ? 'Faculty Full Name' : 'Full Name';
  if (!validateRequired(formData.fullName)) {
    errors.fullName = `${nameField} is required`;
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(formData.password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }

  if (!validateRequired(formData.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!validateRequired(role)) {
    errors.role = 'Please select a role';
  }

  // Role-specific validations
  if (role === 'institute') {
    if (!validateRequired(formData.instituteName)) {
      errors.instituteName = 'Institute name is required';
    }
    if (!validateRequired(formData.location)) {
      errors.location = 'Location is required';
    }
    if (!validateRequired(formData.designation)) {
      errors.designation = 'Designation is required';
    }
    if (!file) {
      errors.file = 'Please upload a proof document for institute registration';
    }
  } 
  
  if (role === 'campus_ambassador') {
    if (!validateRequired(formData.campusName)) {
      errors.campusName = 'Campus name is required';
    }
    if (!validateRequired(formData.ambassadorId)) {
      errors.ambassadorId = 'Ambassador ID is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};