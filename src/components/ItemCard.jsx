import React from 'react';
import Image from '../components/Image';

export default function ItemCard(props) {
  return (
    <div className="items-container">
      <div className="item-card-container">
        <div className="item-image-container">
          <img className="item-image" src={props.src} />
        </div>
        <div className="item-price-container">
          <p>{props.price}</p>
        </div>
        <p className="item-name">{props.name}</p>
        <div className="item-component-container">
          <i>{props.components}</i>
        </div>

        <button className="buy-item-btn">
          <span class="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </div>
  );
}
