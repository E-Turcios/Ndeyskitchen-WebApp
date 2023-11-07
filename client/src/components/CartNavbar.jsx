import React from 'react';
import Headroom from 'react-headroom';

export default function CartNavbar() {
  return (
    <Headroom>
      <div className="item-view-navbar">
        <div className="home-button">
          <a href="/" className="back-btn-container">
            <>Home</>
          </a>
        </div>
      </div>
    </Headroom>
  );
}
