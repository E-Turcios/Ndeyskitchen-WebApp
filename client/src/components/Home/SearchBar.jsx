import { React, useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import searchResultStore from '../../stores/searchResultStore';
import useOnclickOutside from 'react-cool-onclickoutside';

export default function SearchBar(props) {
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(searchText !== '');
  }, [searchText]);

  const ref = useOnclickOutside(() => {
    setIsSearchIconClicked(false);
    setOpen(false);
  });

  if (searchText === '') searchResultStore.setResult('');

  return (
    <>
      <div className="search-field" ref={ref}>
        <div
          className={props.className}
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
            onClick={() => setIsSearchIconClicked(true)}
            className="material-symbols-outlined navbar-icons"
          >
            search
          </span>
        </div>

        <SearchResult
          open={open}
          searchText={searchText}
          closeHamburgerMenu={props.closeHamburgerMenu}
        />
      </div>
    </>
  );
}
