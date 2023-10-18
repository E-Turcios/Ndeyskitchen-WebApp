import React from 'react';
import Image from '../components/Image';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo-img-container">
        <Image className="logo-img" src={'ndeys-kitchen.png'} />
      </div>

      <div className="navbar-information">
        <a>Menu</a>
        <a>Order</a>
      </div>

      <div className="navbar-elements-div">
        <div className="navbar-search-bar-container">
          <input placeholder="Search our menu" className="search-bar" />
        </div>
        <div className="navbar-icons-container">
          <span class="material-symbols-outlined navbar-icons">
            shopping_bag
          </span>
          <span class="material-symbols-outlined navbar-icons">person</span>
          <button type="button" className="form-btn">
            <a href="/login">Login</a>
          </button>
        </div>
      </div>
    </div>
  );
}
