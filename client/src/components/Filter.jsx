import { React, useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from 'react-responsive';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';
import searchResultStore from '../stores/searchResultStore';

const filterObj = {
  ALL: 'All',
  CAKES: 'Cakes',
  CUPCAKES: 'Cupcakes',
  MILKSHAKES: 'Milkshakes',
  PIZZA: 'Pizza',
  WRAPS: 'Wrap',
  WINGS: 'Wings',
  COOKIES: 'Cookies',
  FRUIT_PLATTER: 'Fruit Platter',
  DESSERT_CUPS: 'Dessert Cups',
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

  console.log(filter);

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

        <button
          className={
            filter === filterObj.CAKES ? 'clicked-button' : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.CAKES)}
        >
          {filterObj.CAKES}
        </button>

        <button
          className={
            filter === filterObj.CUPCAKES ? 'clicked-button' : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.CUPCAKES)}
        >
          {filterObj.CUPCAKES}
        </button>

        <button
          className={
            filter === filterObj.FRUIT_PLATTER
              ? 'clicked-button'
              : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.FRUIT_PLATTER)}
        >
          {filterObj.FRUIT_PLATTER}
        </button>
        <button
          className={
            filter === filterObj.DESSERT_CUPS
              ? 'clicked-button'
              : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.DESSERT_CUPS)}
        >
          {filterObj.DESSERT_CUPS}
        </button>

        <button
          className={
            filter === filterObj.COOKIES ? 'clicked-button' : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.COOKIES)}
        >
          {filterObj.COOKIES}
        </button>
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
        <button
          className={
            filter === filterObj.SNACKS ? 'clicked-button' : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.SNACKS)}
        >
          {filterObj.SNACKS}
        </button>
        <button
          className={
            filter === filterObj.BREAK_FAST_BOX
              ? 'clicked-button'
              : 'filter-button'
          }
          onClick={() => handleFilterClick(filterObj.BREAK_FAST_BOX)}
        >
          {filterObj.BREAK_FAST_BOX}
        </button>
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
