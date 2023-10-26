import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Image from './Image';
import Headroom from 'react-headroom';
import useAuthContext from '../hooks/useAuthContext';

export default function Navbar() {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });
  return isBigScreen ? <ComputerNavbar /> : <MobileNavbar />;
}

function ComputerNavbar() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchText, setSearchText] = useState('');

  function logOut() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <Headroom>
      <nav className="navbar-container">
        <div className="navbar-start">
          <a href="/">
            <Image className="img" src={'ndeys-kitchen.png'} />
          </a>

          <div className="navbar-information">
            <a href="#menu">Menu</a>
            <a>Orders</a>
            <a>Rewards</a>
          </div>
        </div>

        <div className="navbar-icons-container">
          <div
            className="navbar-search-bar-container"
            style={{ border: !isSearchIconClicked ? 'none' : null }}
          >
            {isSearchIconClicked && (
              <>
                <input
                  value={searchText}
                  onChange={event => setSearchText(event.target.value)}
                  placeholder="Search our menu"
                  className="search-bar"
                />
                {searchText !== '' && (
                  <span
                    className="material-symbols-outlined input-delete"
                    onClick={() => setSearchText('')}
                  >
                    close
                  </span>
                )}
              </>
            )}

            <span
              style={{ border: !isSearchIconClicked ? 'none' : null }}
              onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
              className="material-symbols-outlined navbar-icons"
            >
              search
            </span>
          </div>

          <span className="material-symbols-outlined navbar-icons">
            shopping_bag
          </span>

          {user && (
            <span className="material-symbols-outlined navbar-icons">
              person
            </span>
          )}

          {user ? (
            <a className="navbar-btn-link" href="/" onClick={logOut}>
              <button type="button" className="navbar-btn">
                Logout
              </button>
            </a>
          ) : (
            <a className="navbar-btn-link" href="/login">
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

function MobileNavbar() {
  const [isActive, setIsActive] = useState(false);
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchText, setSearchText] = useState('');

  function hamburgerMenuClicked() {
    setIsActive(!isActive);
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
            <span className="material-symbols-outlined navbar-icons">
              shopping_bag
            </span>

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
          <div
            className="hamburger-search-bar-container"
            style={{ border: !isSearchIconClicked ? 'none' : null }}
          >
            {isSearchIconClicked && (
              <>
                <input
                  value={searchText}
                  onChange={event => setSearchText(event.target.value)}
                  placeholder="Search our menu"
                  className="search-bar"
                />
                <span
                  className="material-symbols-outlined input-delete"
                  onClick={() => setSearchText('')}
                >
                  close
                </span>
              </>
            )}

            <span
              style={{ border: !isSearchIconClicked ? 'none' : null }}
              onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
              className="material-symbols-outlined navbar-icons"
            >
              search
            </span>
          </div>

          <a
            className="hamburger-menu-information"
            href="#menu"
            onClick={hamburgerMenuClicked}
          >
            Menu
          </a>
          <a
            className="hamburger-menu-information"
            onClick={hamburgerMenuClicked}
          >
            Orders
          </a>

          <a
            className="hamburger-menu-information"
            onClick={hamburgerMenuClicked}
          >
            Rewards
          </a>
          {isActive ? (
            <a
              className="hamburger-menu-information"
              onClick={hamburgerMenuClicked}
            >
              Profile
            </a>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span
                className="material-symbols-outlined navbar-icons"
                onClick={hamburgerMenuClicked}
              >
                person
              </span>
            </div>
          )}

          <a
            className="navbar-btn-link"
            href="/login"
            onClick={hamburgerMenuClicked}
          >
            <button type="button" className="navbar-btn">
              Login
            </button>
          </a>
        </div>
      </nav>
    </Headroom>
  );
}
