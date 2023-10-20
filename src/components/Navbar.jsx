import { React, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Image from '../components/Image';

export default function Navbar() {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1000px)' });
  return isBigScreen ? <ComputerNavbar /> : <MobileNavbar />;
}

function ComputerNavbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-start">
        <a href="/">
          <Image className="img" src={'ndeys-kitchen.png'} />
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
        <span className="material-symbols-outlined navbar-icons">
          shopping_bag
        </span>
        <span className="material-symbols-outlined navbar-icons">person</span>
        <a className="navbar-btn-link" href="/login">
          <button type="button" className="navbar-btn">
            Login
          </button>
        </a>
      </div>
    </div>
  );
}

function MobileNavbar() {
  const [isActive, setIsActive] = useState(false);

  function hamburgerMenuClicked() {
    setIsActive(!isActive);
  }

  return (
    <div
      className="hamburger-menu-navbar-container"
      style={{ height: isActive ? '100%' : null }}
    >
      <div className="hamburger-menu-navbar-elements">
        <a href="/">
          <Image className="img" src={'ndeys-kitchen.png'} />
        </a>
        <div className="hamburger-menu-navbar-icons-container">
          <span className="material-symbols-outlined navbar-icons">
            shopping_bag
          </span>
          <span
            className="material-symbols-outlined navbar-icons hamburger-menu"
            onClick={hamburgerMenuClicked}
          >
            menu
          </span>
        </div>
      </div>

      <div
        className={
          isActive ? 'hamburger-menu-items.active' : 'hamburger-menu-items'
        }
      >
        <input placeholder="Search our menu" className="search-bar" />
        <a className="hamburger-menu-information">Menu</a>
        <a className="hamburger-menu-information">Order</a>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span className="material-symbols-outlined navbar-icons">person</span>
        </div>

        <a className="navbar-btn-link" href="/login">
          <button type="button" className="navbar-btn">
            Login
          </button>
        </a>
      </div>
    </div>
  );
}
