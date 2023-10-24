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

  const filer = useSyncExternalStore(
    filterStore.subscribe,
    filterStore.getFilter
  );

  function arrowHandleClick() {
    setIsClicked(!isClicked);
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
          {category === '' && (
            <>
              <button>All</button>

              <button>Cakes</button>

              <button>Pizza</button>

              <button>Milshakes</button>

              <button>Wrap</button>

              <button>Cupcakes</button>

              <button>Wings</button>
            </>
          )}

          {category === 'Sweet' && (
            <>
              <button>All Sweets</button>
              <button>Cakes</button>

              <button>Cupcakes</button>

              <button>Milshakes</button>
            </>
          )}
          {category === 'Savory' && (
            <>
              <button>All Savory</button>
              <button>Pizza</button>

              <button>Wrap</button>

              <button>Wings</button>
            </>
          )}
        </div>
      )}

      {isSmallScreen &&
        (isClicked ? (
          <div className="items-container">
            {category === '' && (
              <>
                <button>All</button>

                <button>Cakes</button>

                <button>Pizza</button>

                <button>Milshakes</button>

                <button>Wrap</button>

                <button>Cupcakes</button>

                <button>Wings</button>
              </>
            )}

            {category === 'Sweet' && (
              <>
                <button>All Sweets</button>
                <button>Cakes</button>

                <button>Cupcakes</button>

                <button>Milshakes</button>
              </>
            )}
            {category === 'Savory' && (
              <>
                <button>All Savory</button>
                <button>Pizza</button>

                <button>Wrap</button>

                <button>Wings</button>
              </>
            )}
          </div>
        ) : null)}
    </div>
  );
}
