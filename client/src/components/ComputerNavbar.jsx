import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';
import Image from './Image';
import SearchBar from './SearchBar';
import useAuthContext from '../hooks/useAuthContext';

export default function ComputerNavbar() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem('cart'));

  function logOut() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }

  function logIn() {
    navigate('/login');
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
          <SearchBar
            className="navbar-search-bar-container"
            closeHamburgerMenu={() => {
              return;
            }}
          />

          <a className="navbar-shopping-bag-container">
            <span className="items-number">
              {cart !== null ? cart.length : ''}
            </span>
            <span className="material-symbols-outlined navbar-icons">
              shopping_bag
            </span>
          </a>

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
