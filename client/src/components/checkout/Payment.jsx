import { React, useState } from 'react';

export default function Payment({ onButtonClick }) {
  const [buttonId, setButtonId] = useState('');

  function handlePaymentMethodButtonClick(id) {
    setButtonId(id);
    onButtonClick(id);
  }

  console.log(buttonId);

  function handlePaymentChange() {}
  return (
    <div className="payment-container">
      <p className="section">Payment</p>
      <div className="payment-method-container">
        <div className="button-container">
          <button
            className={buttonId === 'Cash' ? 'clicked-btn' : 'btn'}
            onClick={() => handlePaymentMethodButtonClick('Cash')}
          >
            Cash
          </button>
          <button
            className={buttonId === 'GT Bank' ? 'clicked-btn' : 'btn'}
            onClick={() => {
              handlePaymentMethodButtonClick('GT Bank');
            }}
          >
            GT Bank
          </button>

          <button
            className={buttonId === 'Orange Money' ? 'clicked-btn' : 'btn'}
            onClick={() => {
              handlePaymentMethodButtonClick('Orange Money');
            }}
          >
            Orange Money
          </button>
        </div>

        <form className="payment-form">
          {buttonId !== '' && buttonId !== 'Cash' && (
            <p className="payment-method-letterhead">Account Information</p>
          )}

          {buttonId === 'GT Bank' && (
            <>
              <input
                className="input-box"
                type="text"
                placeholder="Account holder's name"
                name="accountHoldersName"
                maxLength="50"
                onChange={handlePaymentChange}
                required
              />
              <input
                className="input-box"
                type="number"
                placeholder="Account number"
                name="accountNumber"
                maxLength="30"
                onChange={handlePaymentChange}
                required
              />
            </>
          )}

          {buttonId === 'Orange Money' && (
            <>
              <input
                className="input-box"
                type="text"
                placeholder="Account holder's name"
                name="accountHoldersName"
                maxLength="50"
                onChange={handlePaymentChange}
                required
              />
              <input
                className="input-box"
                type="number"
                placeholder="Phone number"
                name="phoneNumber"
                maxLength="30"
                onChange={handlePaymentChange}
                required
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}
