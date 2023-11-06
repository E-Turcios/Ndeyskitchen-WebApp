import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';
import Image from './Image';
import SearchBar from './SearchBar';
import useAuthContext from '../hooks/useAuthContext';
import useCartSizeContext from '../hooks/useCartSizeContext';

export default function MobileNavbar() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const { cartSize } = useCartSizeContext();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const cart = JSON.parse(localStorage.getItem('cart'));

  function hamburgerMenuClicked() {
    setIsActive(!isActive);
  }

  function logOut() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }

  function logIn() {
    navigate('/login');
  }

  return (
    <Headroom>
      <nav
        className="hamburger-menu-navbar-container"
        style={{ height: isActive ? '100vh' : null }}
      >
        {isActive && (
          <style>
            {`
           body {
              overflow: hidden;
            }
          `}
          </style>
        )}
        <div className="hamburger-menu-navbar-elements">
          <a href="/">
            <Image className="img" src={'ndeys-kitchen.png'} />
          </a>

          <div className="hamburger-menu-navbar-icons-container">
            <div className="navbar-shopping-bag-container">
              <span className="items-number">{cartSize}</span>
              <span className="material-symbols-outlined navbar-icons">
                shopping_bag
              </span>
            </div>

            <span
              className={`material-symbols-outlined navbar-icons hamburger-menu ${
                isActive ? 'open' : ''
              }`}
              onClick={hamburgerMenuClicked}
            >
              {isActive ? 'close' : 'menu'}
            </span>
          </div>
        </div>

        <div
          className="hamburger-menu-items"
          style={{ left: isActive ? '0%' : null }}
        >
          <SearchBar
            className="hamburger-search-bar-container"
            closeHamburgerMenu={hamburgerMenuClicked}
          />

          <a
            className="hamburger-menu-information"
            href="#menu"
            onClick={hamburgerMenuClicked}
          >
            Menu
          </a>
          <a className="hamburger-menu-information">Orders</a>

          <a className="hamburger-menu-information">Rewards</a>

          {user ? (
            isActive ? (
              <a className="hamburger-menu-information">Profile</a>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span className="material-symbols-outlined navbar-icons">
                  person
                </span>
              </div>
            )
          ) : null}

          {user ? (
            <a className="navbar-btn-link" href="/" onClick={logOut}>
              <button type="button" className="navbar-btn">
                Logout
              </button>
            </a>
          ) : (
            <a className="navbar-btn-link" onClick={logIn}>
              <button type="button" className="navbar-btn">
                Login
              </button>
            </a>
          )}
        </div>
      </nav>
    </Headroom>
  );
}
