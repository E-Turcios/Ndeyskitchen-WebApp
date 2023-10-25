import { React, useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from 'react-responsive';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';

// Define constants for filter names
const ALL = 'All';
const CAKES = 'Cakes';
const CUPCAKES = 'Cupcakes';
const MILKSHAKES = 'Milkshakes';
const PIZZA = 'Pizza';
const WRAPS = 'Wraps';
const WINGS = 'Wings';

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
  }

  function All() {
    return (
      <>
        <button
          className={filter === ALL ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(ALL)}
        >
          All
        </button>
        <Sweet />
        <Savory />
      </>
    );
  }

  function Sweet() {
    return (
      <>
        {category === 'Sweet' && (
          <button
            className={filter === ALL ? 'clicked-button' : 'filter-button'}
            onClick={() => handleFilterClick(ALL)}
          >
            All Sweets
          </button>
        )}

        <button
          className={filter === CAKES ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(CAKES)}
        >
          Cakes
        </button>
        <button
          className={filter === CUPCAKES ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(CUPCAKES)}
        >
          Cupcakes
        </button>
        <button
          className={filter === MILKSHAKES ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(MILKSHAKES)}
        >
          Milkshakes
        </button>
      </>
    );
  }

  function Savory() {
    return (
      <>
        {category === 'Savory' && (
          <button
            className={filter === ALL ? 'clicked-button' : 'filter-button'}
            onClick={() => handleFilterClick(ALL)}
          >
            All Savory
          </button>
        )}
        <button
          className={filter === PIZZA ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(PIZZA)}
        >
          Pizza
        </button>
        <button
          className={filter === WRAPS ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(WRAPS)}
        >
          Wrap
        </button>
        <button
          className={filter === WINGS ? 'clicked-button' : 'filter-button'}
          onClick={() => handleFilterClick(WINGS)}
        >
          Wings
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
          {category === '' && <All />}
          {category === 'Sweet' && <Sweet />}
          {category === 'Savory' && <Savory />}
        </div>
      )}

      {isSmallScreen &&
        (isClicked ? (
          <div className="items-container">
            {category === '' && <All />}
            {category === 'Sweet' && <Sweet />}
            {category === 'Savory' && <Savory />}
          </div>
        ) : null)}
    </div>
  );
}
