import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import Headroom from 'react-headroom';
import Image from './Image';

import useAuthContext from '../hooks/useAuthContext';

export default function ComputerNavbar() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchText, setSearchText] = useState('');

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
          <div className="search-field">
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

            <SearchModal>
              <div className="search-result">
                <p>Heeeyyy</p>

                <p>Heeeyyy</p>
                <p>Heeeyyy</p>
                <p>Heeeyyy</p>
                <p>Heeeyyy</p>
              </div>
            </SearchModal>
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
