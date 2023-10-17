import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
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
        <div className="navbar-icons">
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ color: 'red' }}
            className="fa-thin"
          />
        </div>
      </div>
    </div>
  );
}
