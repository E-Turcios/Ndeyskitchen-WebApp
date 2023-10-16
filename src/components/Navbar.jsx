import React from 'react';
import Image from '../components/Image';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <Image className="logo-img" src={'ndeys-kitchen.png'} />
      <div className="navbar-information">
        <a>ABOUT US</a>
        <a>CONTACT US</a>
      </div>

      <div className="navbar-elements-div">
        <div className="navbar-search-bar">Hello</div>
        <div className="navbar-icons">Hello</div>
      </div>
    </div>
  );
}
