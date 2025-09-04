const API_BASE_URL = 'https://ccc-backend-0qxy.onrender.com';

export const api = {
  googleAuth: async (authData) => {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    const data = await response.json();
    return { response, data };
  },

  login: async (loginData) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    return { response, data };
  },

  signup: async (signupData, file = null) => {
    let body;
    let headers = {};

    if (file) {
      // Use FormData for file uploads
      const formData = new FormData();
      Object.keys(signupData).forEach(key => {
        if (key === 'age') {
          formData.append(key, parseInt(signupData[key]));
        } else {
          formData.append(key, signupData[key]);
        }
      });
      formData.append('proof', file);
      body = formData;
    } else {
      // Use JSON for regular signup
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify({
        ...signupData,
        age: parseInt(signupData.age)
      });
    }

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();
    return { response, data };
  }
};