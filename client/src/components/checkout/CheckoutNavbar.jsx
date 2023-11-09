import React from 'react';
import Headroom from 'react-headroom';

export default function CheckoutNavbar() {
  return (
    <Headroom>
      <div className="item-view-navbar ">
        <div className="home-button cart-button">
          <a href="/cart" className="back-btn-container">
            <>Cart</>
          </a>
        </div>
      </div>
    </Headroom>
  );
}
