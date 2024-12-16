// SignOutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <a onClick={handleSignOut}>
      Sign Out
    </a>
  );
};

export default SignOutButton;
