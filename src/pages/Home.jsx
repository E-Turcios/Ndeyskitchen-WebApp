import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoyaltyProgramBanner from '../components/LoyaltyProgramBanner';
import Category from '../components/Category';
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="home-page-container">
      <Navbar />
      <LoyaltyProgramBanner />
      <Category />
    </div>
  );
}
