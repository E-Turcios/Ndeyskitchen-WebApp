import React from 'react';
import Image from '../Image';

export default function CartCard({ item, index, subtotals, handleClick }) {
  return (
    <div className="card-container" key={item.id}>
      <div className="cart-card">
        <div className="cart-image-container">
          <Image src={item.image} alt={item.alt} className="cart-item-image" />
        </div>
        <div className="cart-item-information">
          <div className="cart-name-price">
            <p className="cart-item-name">{item.name}</p>
            <p className="cart-item-price">D {item.price}</p>
          </div>
          <p className="cart-item-components">{item.components}</p>
          <p>{item.size}</p>
          <p> Sub total: </p>
          <p>
            {item.quantity} x D {item.price} = D {subtotals[index]}
          </p>
          <p className="item-remove" onClick={() => handleClick(item.id)}>
            Remove
          </p>
        </div>
      </div>
      <div className="divider-container">
        <span className="divider"></span>
      </div>
    </div>
  );
}
