import { React, useState } from 'react';

export default function Payment({ onButtonClick }) {
  const [buttonId, setButtonId] = useState('');

  function handlePaymentMethodButtonClick(event, id) {
    event.preventDefault();
    setButtonId(id);
    onButtonClick(id);
  }

  function handlePaymentChange() {}
  return (
    <div className="payment-container">
      <p className="section">Payment</p>
      <div className="payment-method-container">
        <div className="button-container">
          <button
            className={buttonId === 'Cash' ? 'clicked-btn' : 'btn'}
            onClick={event => handlePaymentMethodButtonClick(event, 'Cash')}
          >
            Cash
          </button>
          <button
            className={buttonId === 'GT Bank' ? 'clicked-btn' : 'btn'}
            onClick={event => {
              handlePaymentMethodButtonClick(event, 'GT Bank');
            }}
          >
            GT Bank
          </button>

          <button
            className={buttonId === 'Orange Money' ? 'clicked-btn' : 'btn'}
            onClick={event => {
              handlePaymentMethodButtonClick(event, 'Orange Money');
            }}
          >
            Orange Money
          </button>
        </div>

        {buttonId !== '' && buttonId !== 'Cash' && (
          <form className="payment-form">
            <p className="payment-method-letterhead">Account Information</p>

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
                  type="text"
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
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  maxLength="30"
                  onChange={handlePaymentChange}
                  required
                />
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
