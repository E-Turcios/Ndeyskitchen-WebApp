import React from 'react';
import Image from './Image';

export default function ItemCard(props) {
  function truncateComponentList(components) {
    if (components.length > 31) return components.slice(0, 5) + '...';
    return components;
  }
  return (
    <div className="item-container">
      <div className="item-card-container">
        <div className="item-image-container">
          <Image alt={props.alt} className="item-image" src={props.src} />
        </div>
        <div className="item-price-container">
          <p>$ {props.price}</p>
        </div>
        <p className="item-name">{props.name}</p>
        <div className="item-component-container">
          <i>{truncateComponentList(props.components)}</i>
        </div>

        <button className="buy-item-btn">
          <span class="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </div>
  );
}
