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
          {foundCakesFilter.length === 0 && (
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

          <button
            className={buttonId === 'Cash pick up' ? 'clicked-btn' : 'btn'}
            onClick={event => {
              handlePaymentMethodButtonClick(event, 'Cash pick up');
            }}
          >
            Cash Pick up
          </button>
        </div>

        {buttonId !== '' && buttonId !== 'Cash' && (
          <div className="payment-form">
            <p className="payment-method-letterhead">Method</p>

            {buttonId === 'GT Bank' && (
              <>
                <p className="delivery-fees">
                  Submit a payment to: <span>2011272741590</span>
                </p>
                <p className="delivery-fees">
                  Name: <span>Ndey Koumba Sillah</span>
                </p>
                <p className="delivery-fees">
                  Send payment proof on WhatsApp: <span>+220 794 4636</span>
                </p>
                <p className="delivery-fees">
                  with the order number from the email you will receive.
                </p>
              </>
            )}

            {buttonId === 'Cash pick up' && (
              <>
                <p className="delivery-fees">
                  A driver will collect the total amount plus <span>D 150</span>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
