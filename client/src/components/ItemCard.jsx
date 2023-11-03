import React from 'react';
import Image from './Image';

export default function ItemCard(props) {
  function truncateComponentList(components) {
    const maxLength = 35;

    if (components.length > maxLength)
      return components.slice(0, maxLength) + '...';
    return components;
  }

  return (
    <div className="item-container">
      <div className="item-card-container">
        <div className="item-image-container">
          <Image alt={props.alt} className="item-image" src={props.src} />
        </div>
        <div className="item-price-container">
          <p>D {props.price}</p>
        </div>
        <p className="item-name">{props.name}</p>
        <div className="item-component-container">
          <i>{truncateComponentList(props.components)}</i>
        </div>

        <a href={`/item/${props.id}`} target="_blank">
          <button className="buy-item-btn">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </a>
      </div>
    </div>
  );
}
