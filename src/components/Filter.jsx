import { React, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Filter() {
  const [isClicked, setIsClicked] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 850px)' });
  const isBigScreen = useMediaQuery({ query: '(min-width: 850px)' });

  function arrowHandleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div className="filter-container">
      <div className="filter">
        <p>Filter</p>
        {isSmallScreen && (
          <span class="material-symbols-outlined" onClick={arrowHandleClick}>
            {isClicked ? 'expand_less' : 'expand_more'}
          </span>
        )}
      </div>

      {isBigScreen && (
        <div className="items-container">
          <button>All</button>
          <button>Cakes</button>

          <button>Cupcakes</button>

          <button>Milshakes</button>
        </div>
      )}

      {isSmallScreen &&
        (isClicked ? (
          <div className="items-container">
            <button>All</button>
            <button>Cakes</button>

            <button>Cupcakes</button>

            <button>Milshakes</button>
          </div>
        ) : null)}
    </div>
  );
}
