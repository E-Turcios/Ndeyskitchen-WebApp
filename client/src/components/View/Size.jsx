import { React, useState, useEffect } from 'react';

export default function Size({
  item,
  handleSizeSelect,
  handleSizeSelectPrice,
}) {
  const [itemOptions, setItemOptions] = useState([]);
  const [price, setPrice] = useState(item.price);
  const [itemSize, setSize] = useState(item.size);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItemOptions() {
      const response = await fetch('/api/items/get-item-options', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.status);
        return;
      }

      setItemOptions(json);
      setIsLoading(false);
    }

    fetchItemOptions();
  }, []);

  const viewItem = itemOptions.find(viewItem => viewItem.name === item.name);

  return !isLoading ? (
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
  ) : (
    <>Loading...</>
  );
}
