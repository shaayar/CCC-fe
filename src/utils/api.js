// API Utility Functions
export const api = {
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return result;
  }
};

export const API_ENDPOINTS = {
  LOGIN: 'https://ccc-backend-0qxy.onrender.com/login',
  SIGNUP: 'https://ccc-backend-0qxy.onrender.com/signup'
};