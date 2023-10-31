import { React } from 'react';
import useFetchedItems from '../hooks/useFetchedItems';
import searchResultStore from '../stores/searchResultStore';

export default function SearchResult({ searchText }) {
  const { items, isLoading } = useFetchedItems();

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="search-result">
      {isLoading ? (
        <p>Searching...</p>
      ) : (
        filteredItems.map((item, id) => {
          return (
            <p key={id} onClick={() => searchResultStore.setResult(item.name)}>
              {item.name}
            </p>
          );
        })
      )}
    </div>
  );
}
