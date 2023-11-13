import { React, useState } from 'react';

export default function Service({ onButtonClick }) {
  const [buttonId, setButtonId] = useState('');

  function handleServiceButtonClick(event, id) {
    event.preventDefault();
    setButtonId(id);
    onButtonClick(id);
  }
  return (
    <div className="service-message-container">
      <div className="service-container">
        <p className="section">Service</p>
        <div className="button-container">
          <button
            className={buttonId === 'Pick-up' ? 'clicked-btn' : 'btn'}
            onClick={event => handleServiceButtonClick(event, 'Pick-up')}
          >
            Pick up
          </button>
          <button
            className={buttonId === 'Delivery' ? 'clicked-btn' : 'btn'}
            onClick={event => {
              handleServiceButtonClick(event, 'Delivery');
            }}
          >
            Delivery
          </button>
        </div>
      </div>
      {buttonId === 'Delivery' && (
        <p className="delivery-fees">Driver's drop-off, fees apply</p>
      )}
    </div>
  );
}
