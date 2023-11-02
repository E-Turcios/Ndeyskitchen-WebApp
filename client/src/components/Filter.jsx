import { React, useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from 'react-responsive';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';
import searchResultStore from '../stores/searchResultStore';

const filterObj = {
  ALL: 'All',
};

const sweetFilter = {
  CAKES: 'Cakes',
  CUPCAKES: 'Cupcakes',
  COOKIES: 'Cookies',
  FRUIT_PLATTER: 'Fruit Platter',
  DESSERT_CUPS: 'Dessert Cups',
};

const savoryFilter = {
  BREAK_FAST_BOX: 'Breakfast Box',
  SNACKS: 'Snacks',
};

export default function Filter() {
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

  function arrowHandleClick() {
    setIsClicked(!isClicked);
  }

  function handleFilterClick(filterId) {
    filterStore.setId(filterId);
    searchResultStore.setResult('');
  }

  function All() {
    return (
      category === 'All' && (
        <>
          <button
            className={
              filter === filterObj.ALL ? 'clicked-button' : 'filter-button'
            }
            onClick={() => handleFilterClick(filterObj.ALL)}
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
            className={
              filter === filterObj.ALL ? 'clicked-button' : 'filter-button'
            }
            onClick={() => handleFilterClick(filterObj.ALL)}
          >
            All Sweets
          </button>
        )}

        {Object.keys(sweetFilter).map(filterKey => (
          <button
            key={filterKey}
            className={
              filter === sweetFilter[filterKey]
                ? 'clicked-button'
                : 'filter-button'
            }
            onClick={() => handleFilterClick(sweetFilter[filterKey])}
          >
            {sweetFilter[filterKey]}
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
            className={
              filter === filterObj.ALL ? 'clicked-button' : 'filter-button'
            }
            onClick={() => handleFilterClick(filterObj.ALL)}
          >
            All Savory
          </button>
        )}

        {Object.keys(savoryFilter).map(filterKey => (
          <button
            key={filterKey}
            className={
              filter === savoryFilter[filterKey]
                ? 'clicked-button'
                : 'filter-button'
            }
            onClick={() => handleFilterClick(savoryFilter[filterKey])}
          >
            {savoryFilter[filterKey]}
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
