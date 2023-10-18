import React from 'react';
import Image from '../components/Image';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-start">
        <a href="/">
          <Image className="logo-img" src={'ndeys-kitchen.png'} />
        </a>

        <div className="navbar-information">
          <a>Menu</a>
          <a>Order</a>
        </div>
      </div>

      <div className="navbar-search-bar-container">
        <input placeholder="Search our menu" className="search-bar" />
      </div>
      <div className="navbar-icons-container">
        <span class="material-symbols-outlined navbar-icons">shopping_bag</span>
        <span class="material-symbols-outlined navbar-icons">person</span>
        <a href="/login">
          <button type="button" className="form-btn">
            Login
          </button>
        </a>
      </div>
    </div>
  );
}
