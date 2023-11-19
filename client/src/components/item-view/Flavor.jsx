import { React, useState } from 'react';

export default function Size({ item, handleFlavorSelect }) {
  const [buttonClicked, setButtonClicked] = useState(false);

  function handleButtonClick(flavor) {
    setButtonClicked(flavor);
    handleFlavorSelect(flavor);
  }

  return (
    <>
      <p className="tag">Flavor</p>

      <div className="size-container" required>
        {item.flavors.map(flavor => (
          <div
            key={flavor}
            className={
              buttonClicked === flavor
                ? 'size-price-card size-price-card-clicked'
                : 'size-price-card'
            }
            onClick={() => handleButtonClick(flavor)}
          >
            <p>{flavor}</p>
          </div>
        ))}
      </div>
    </>
  );
}
