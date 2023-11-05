import { React, useState } from 'react';
import { itemOptions } from '../scripts/itemOptions.js';

export default function Size({
  item,
  handleSizeSelect,
  handleSizeSelectPrice,
}) {
  const viewItem = itemOptions.find(viewItem => viewItem.name === item.name);
  const [price, setPrice] = useState(item.price);
  const [itemSize, setSize] = useState(item.size);

  return (
    <>
      <p className="tag">Size</p>
      {handleSizeSelectPrice(price)}

      <div className="size-container">
        {Object.keys(viewItem.size).map(size => (
          <div
            key={size}
            className={
              price === viewItem.size[size]
                ? 'size-price-card size-price-card-clicked'
                : 'size-price-card'
            }
            onClick={() => {
              setPrice(viewItem.size[size]);
              setSize(size);
            }}
          >
            {handleSizeSelect(itemSize)}
            <p>{size}</p>

            <p className="size-price">D {viewItem.size[size]}</p>
          </div>
        ))}
      </div>
    </>
  );
}
