import { React, useState } from 'react';

export default function Payment({ onButtonClick }) {
  const [buttonId, setButtonId] = useState('');
  const cart = JSON.parse(localStorage.getItem('cart'));
  const foundCakesFilter = cart.filter(item => item.filter === 'Cakes');

  function handlePaymentMethodButtonClick(event, id) {
    event.preventDefault();
    setButtonId(id);
    onButtonClick(id);
  }

  return (
    <div className="payment-container">
      <p className="section">Payment</p>
      <div className="payment-method-container">
        <div className="button-container">
          {!foundCakesFilter && (
            <button
              className={buttonId === 'Cash' ? 'clicked-btn' : 'btn'}
              onClick={event => handlePaymentMethodButtonClick(event, 'Cash')}
            >
              Cash
            </button>
          )}

          <button
            className={buttonId === 'GT Bank' ? 'clicked-btn' : 'btn'}
            onClick={event => {
              handlePaymentMethodButtonClick(event, 'GT Bank');
            }}
          >
            GT Bank
          </button>
        </div>

        {buttonId !== '' && buttonId !== 'Cash' && (
          <div className="payment-form">
            <p className="payment-method-letterhead">Money Transfer</p>

            {buttonId === 'GT Bank' && (
              <>
                <p className="delivery-fees">
                  Make and payment to 2011272741590.
                </p>
                <p className="delivery-fees">
                  Send a screenshot of the payment to the WhatsApp number +220
                  756 3799
                </p>
                <p className="delivery-fees">
                  with the order number from the email you will receive.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
