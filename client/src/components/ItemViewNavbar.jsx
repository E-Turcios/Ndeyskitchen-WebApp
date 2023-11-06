import React from 'react';
import Headroom from 'react-headroom';
import useCartSizeContext from '../hooks/useCartSizeContext';

export default function ItemViewNavbar() {
  const { cartSize } = useCartSizeContext();
  return (
    <Headroom>
      <div className="item-view-navbar">
        <div className="back-button">
          <a href="/" className="back-btn-container">
            <span className="material-symbols-outlined">arrow_back</span>
            <>Back</>
          </a>
        </div>

        <div className="shopping-bag-container">
          <a>
            <span className="items-number">{cartSize}</span>
            <span className="material-symbols-outlined">shopping_bag</span>
          </a>
        </div>
      </div>
    </Headroom>
  );
}
