import { React, useState } from 'react';

export default function Service({ onButtonClick }) {
  const [buttonId, setButtonId] = useState('');

  function handleServiceButtonClick(id) {
    setButtonId(id);
    onButtonClick(id);
  }
  return (
    <div className="service-container">
      <p className="section">Service</p>
      <div className="button-container">
        <button
          className={buttonId === 'Pick-up' ? 'clicked-btn' : 'btn'}
          onClick={() => handleServiceButtonClick('Pick-up')}
        >
          Pick up
        </button>
        <button
          className={buttonId === 'Delivery' ? 'clicked-btn' : 'btn'}
          onClick={() => {
            handleServiceButtonClick('Delivery');
          }}
        >
          Delivery
        </button>
      </div>
    </div>
  );
}
