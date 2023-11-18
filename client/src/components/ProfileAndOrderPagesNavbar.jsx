import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';

export default function ProfileAndOrderPagesNavbar() {
  const navigate = useNavigate();
  return (
    <Headroom>
      <nav className="profile-navbar-container">
        <span
          className="material-symbols-outlined navbar-icons"
          onClick={() => navigate('/')}
        >
          arrow_back_ios
        </span>
      </nav>
    </Headroom>
  );
}
