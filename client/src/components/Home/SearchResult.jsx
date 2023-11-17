import React from 'react';
import useFetchedItems from '../../hooks/useFetchedItems';
import searchResultStore from '../../stores/searchResultStore';

export default function SearchResult({ open, searchText, closeHamburgerMenu }) {
  const { items, isLoading } = useFetchedItems();

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    open && (
      <div className="search-result">
        {isLoading ? (
          <p>Searching...</p>
        ) : filteredItems.length === 0 ? (
          <p>No result.</p>
        ) : (
          filteredItems.map((item, id) => (
            <a
              key={id}
              href="#menu"
              onClick={() => {
                searchResultStore.setResult(item.name);
                closeHamburgerMenu();
              }}
            >
              {item.name}
            </a>
          ))
        )}
      </div>
    )
  );
}
