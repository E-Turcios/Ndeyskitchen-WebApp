import React from 'react';
import useFetchedItems from '../hooks/useFetchedItems';
import searchResultStore from '../stores/searchResultStore';

export default function SearchResult({ open, searchText }) {
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
            <p key={id} onClick={() => searchResultStore.setResult(item.name)}>
              {item.name}
            </p>
          ))
        )}
      </div>
    )
  );
}
