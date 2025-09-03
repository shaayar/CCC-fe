import React, { useState } from 'react';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';

const AppRouter = () => {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      {currentPage === 'login' ? (
        <LoginPage onSwitchToSignup={() => setCurrentPage('signup')} />
      ) : (
        <SignupPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  );
};

export default AppRouter;