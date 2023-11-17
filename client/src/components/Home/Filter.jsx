import { React, useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from 'react-responsive';
import categoryStore from '../../stores/categoryStore';
import filterStore from '../../stores/filterStore';
import searchResultStore from '../../stores/searchResultStore';
import useFetchedItems from '../../hooks/useFetchedItems';

export default function Filter() {
  const { items } = useFetchedItems();
  const uniqueFilters = new Set();

  const [isClicked, setIsClicked] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 850px)' });
  const isBigScreen = useMediaQuery({ query: '(min-width: 850px)' });

  const category = useSyncExternalStore(
    categoryStore.subscribe,
    categoryStore.getCategory
  );

  const filter = useSyncExternalStore(
    filterStore.subscribe,
    filterStore.getFilter
  );

  console.log(filter);

  function arrowHandleClick() {
    setIsClicked(!isClicked);
  }

  function handleFilterClick(filterId) {
    filterStore.setId(filterId);
    searchResultStore.setResult('');
  }

  const filteredSweetItems = items
    .map(item => {
      if (item.category === 'Sweet' && !uniqueFilters.has(item.filter)) {
        uniqueFilters.add(item.filter);
        return item;
      }
      return null;
    })
    .filter(Boolean);

  const filteredSavoryItems = items
    .map(item => {
      if (item.category === 'Savory' && !uniqueFilters.has(item.filter)) {
        uniqueFilters.add(item.filter);
        return item;
      }
      return null;
    })
    .filter(Boolean);

  function All() {
    return (
      category === 'All' && (
        <>
          <button
            className={filter === 'All' ? 'clicked-button' : 'filter-button'}
            onClick={() => handleFilterClick('All')}
          >
            All
          </button>
          <Sweet />
          <Savory />
        </>
      )
    );
  }

  function Sweet() {
    return (
      <>
        {category === 'Sweet' && (
          <button
            className={filter === 'All' ? 'clicked-button' : 'filter-button'}
            onClick={() => handleFilterClick('All')}
          >
            All Sweets
          </button>
        )}

        {filteredSweetItems.map(item => (
          <button
            key={item._id}
            className={
              filter === item.filter ? 'clicked-button' : 'filter-button'
            }
            onClick={() => {
              handleFilterClick(item.filter);
              uniqueFilters.add(item.filter);
            }}
          >
            {item.filter}
          </button>
        ))}
      </>
    );
  }

  function Savory() {
    return (
      <>
        {category === 'Savory' && (
          <button
            className={filter === 'All' ? 'clicked-button' : 'filter-button'}
            onClick={() => handleFilterClick(filterObj.ALL)}
          >
            All Savory
          </button>
        )}

        {filteredSavoryItems.map(item => (
          <button
            key={item._id}
            className={
              filter === item.filter ? 'clicked-button' : 'filter-button'
            }
            onClick={() => {
              handleFilterClick(item.filter);
              uniqueFilters.add(item.filter);
            }}
          >
            {item.filter}
          </button>
        ))}
      </>
    );
  }

  return (
    <div className="filter-container">
      <div className="filter" onClick={arrowHandleClick}>
        <p>Filter</p>
        {isSmallScreen && (
          <span className="material-symbols-outlined">
            {isClicked ? 'expand_less' : 'expand_more'}
          </span>
        )}
      </div>

      {isBigScreen && (
        <div className="items-container">
          {category === 'All' && <All />}
          {category === 'Sweet' && <Sweet />}
          {category === 'Savory' && <Savory />}
        </div>
      )}

      {isSmallScreen &&
        (isClicked ? (
          <div className="items-container">
            {category === 'All' && <All />}
            {category === 'Sweet' && <Sweet />}
            {category === 'Savory' && <Savory />}
          </div>
        ) : null)}
    </div>
  );
}
