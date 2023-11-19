import { React, useState } from 'react';

export default function Size({
  item,
  handleSizeSelect,
  handleSizeSelectPrice,
}) {
  const [price, setPrice] = useState(item.price);
  const [itemSize, setSize] = useState(Object.keys(item.size)[0]);

  return (
    <>
      <p className="tag">Size</p>
      {handleSizeSelectPrice(price)}

      <div className="size-container">
        {Object.keys(item.size).map(size => (
          <div
            key={size}
            className={
              price === item.size[size]
                ? 'size-price-card size-price-card-clicked'
                : 'size-price-card'
            }
            onClick={() => {
              setPrice(item.size[size]);
              setSize(size);
            }}
          >
            {handleSizeSelect(itemSize)}
            <p>{size}</p>

            <p className="size-price">D {item.size[size]}</p>
          </div>
        ))}
      </div>
    </>
  );
}
