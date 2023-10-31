import { React, useState } from 'react';
import SearchResult from './SearchResult';
import searchResultStore from '../stores/searchResultStore';

export default function SearchBar() {
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <>
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
                  onClick={() => searchResultStore.setResult(setSearchText(''))}
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

        <SearchResult open={searchText !== ''} searchText={searchText} />
      </div>
    </>
  );
}
