import { React, useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from 'react-responsive';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';

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

  console.log(filter);

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
          {category === '' && (
            <>
              <button onClick={() => handleFilterClick('All')}>All</button>
              <button onClick={() => handleFilterClick('Cakes')}>Cakes</button>
              <button onClick={() => handleFilterClick('Pizza')}>Pizza</button>
              <button onClick={() => handleFilterClick('Milkshakes')}>
                Milkshakes
              </button>
              <button onClick={() => handleFilterClick('Wrap')}>Wrap</button>
              <button onClick={() => handleFilterClick('Cupcakes')}>
                Cupcakes
              </button>
              <button onClick={() => handleFilterClick('Wings')}>Wings</button>
            </>
          )}

          {category === 'Sweet' && (
            <>
              <button onClick={() => handleFilterClick('All Sweets')}>
                All Sweets
              </button>
              <button onClick={() => handleFilterClick('Cakes')}>Cakes</button>
              <button onClick={() => handleFilterClick('Cupcakes')}>
                Cupcakes
              </button>
              <button onClick={() => handleFilterClick('Milkshakes')}>
                Milkshakes
              </button>
            </>
          )}
          {category === 'Savory' && (
            <>
              <button onClick={() => handleFilterClick('All Savory')}>
                All Savory
              </button>
              <button onClick={() => handleFilterClick('Pizza')}>Pizza</button>
              <button onClick={() => handleFilterClick('Wrap')}>Wrap</button>
              <button onClick={() => handleFilterClick('Wings')}>Wings</button>
            </>
          )}
        </div>
      )}

      {isSmallScreen &&
        (isClicked ? (
          <div className="items-container">
            {category === '' && (
              <>
                <button onClick={() => handleFilterClick('All Sweets')}>
                  All Sweets
                </button>
                <button onClick={() => handleFilterClick('Cakes')}>
                  Cakes
                </button>
                <button onClick={() => handleFilterClick('Cupcakes')}>
                  Cupcakes
                </button>
                <button onClick={() => handleFilterClick('Milkshakes')}>
                  Milkshakes
                </button>
              </>
            )}

            {category === 'Sweet' && (
              <>
                <>
                  <button onClick={() => handleFilterClick('All Savory')}>
                    All Savory
                  </button>
                  <button onClick={() => handleFilterClick('Pizza')}>
                    Pizza
                  </button>
                  <button onClick={() => handleFilterClick('Wrap')}>
                    Wrap
                  </button>
                  <button onClick={() => handleFilterClick('Wings')}>
                    Wings
                  </button>
                </>
              </>
            )}
            {category === 'Savory' && (
              <>
                <button onClick={() => handleFilterClick('All')}>All</button>
                <button onClick={() => handleFilterClick('Cakes')}>
                  Cakes
                </button>
                <button onClick={() => handleFilterClick('Pizza')}>
                  Pizza
                </button>
                <button onClick={() => handleFilterClick('Milkshakes')}>
                  Milkshakes
                </button>
                <button onClick={() => handleFilterClick('Wrap')}>Wrap</button>
                <button onClick={() => handleFilterClick('Cupcakes')}>
                  Cupcakes
                </button>
                <button onClick={() => handleFilterClick('Wings')}>
                  Wings
                </button>
              </>
            )}
          </div>
        ) : null)}
    </div>
  );
}
