import { React, useState } from 'react';

export default function Quantity({ getQuantity }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      {getQuantity(quantity)}
      <p className="tag">Quantity</p>
      <div className="quantity">
        <span
          className="material-symbols-outlined"
          onClick={() => {
            if (quantity === 1) return;
            setQuantity(quantity - 1);
          }}
        >
          remove
        </span>
        <p className="content">{quantity}</p>
        <span
          className="material-symbols-outlined"
          onClick={() => setQuantity(quantity + 1)}
        >
          add
        </span>{' '}
      </div>
    </>
  );
}
