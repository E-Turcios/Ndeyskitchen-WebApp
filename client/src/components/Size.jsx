import { React, useState } from 'react';
import { priceAndSize } from '../scripts/priceAndSize.js';

export default function Size({ item, onSizeSelect, selectedSize }) {
  const viewItem = priceAndSize.find(viewItem => viewItem.name === item.name);

  return (
    <>
      <p className="tag">Size</p>
      <div className="size-container">
        {Object.keys(viewItem.size).map(size => (
          <p
            key={size}
            className={
              size === selectedSize && 'size-container size-container-clicked'
            }
            onClick={() => {
              onSizeSelect(size, viewItem.size[size]);
            }}
          >
            {size}
          </p>
        ))}
      </div>
    </>
  );
}
