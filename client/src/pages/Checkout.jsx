import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutNavbar from '../components/checkout/CheckoutNavbar.jsx';
import Information from '../components/checkout/Information.jsx';
import Service from '../components/checkout/Service.jsx';
import Payment from '../components/checkout/Payment.jsx';

export default function Checkout() {
  const navigate = useNavigate();

  const [service, setService] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [total, setTotal] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [datesAndTimes, setDatesAndTimes] = useState({
    nonCake: { selectedDate: '', selectedTime: '' },
    cake: { selectedDate: '', selectedTime: '' },
  });

  const [userData, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    residence: '',
  });

  function handleUserInfoCollection(updatedData) {
    setUser({
      ...userData,
      ...updatedData,
    });
  }

  function handleServiceCollection(id) {
    setService(id);
  }

  function handlePaymentMethodCollection(id) {
    setPaymentMethod(id);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart'));
    const { selectedDate: selectedCakeDate, selectedTime: selectedCakeTime } =
      JSON.parse(localStorage.getItem('cake-date-and-time'));

    const {
      selectedDate: selectedNonCakeDate,
      selectedTime: selectedNonCakeTime,
    } = JSON.parse(localStorage.getItem('non-cake-date-and-time'));

    setTotal(JSON.parse(localStorage.getItem('total-price')));
    setDatesAndTimes({
      nonCake: {
        selectedDate: selectedNonCakeDate,
        selectedTime: selectedNonCakeTime,
      },
      cake: { selectedDate: selectedCakeDate, selectedTime: selectedCakeTime },
    });

    const information = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      number: userData.number,
      residence: userData.residence,
      service,
      paymentMethod,
      items: cart,
      total,
      datesAndTimes,
    };

    async function onSubmit() {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ information }),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
      }

      setIsButtonClicked(true);
      localStorage.removeItem('cart');
      localStorage.removeItem('total-price');
      localStorage.removeItem('cake-date-and-time');
      localStorage.removeItem('non-cake-date-and-time');
      setTimeout(() => navigate('/'), 2000);
    }

    onSubmit();
  }

  return (
    <div className="checkout-page-container">
      <CheckoutNavbar />
      <form className="checkout-content-container">
        <p className="checkout-header">Checkout</p>
        <Information onFormChange={handleUserInfoCollection} />
        <span className="divider"></span>
        <Service onButtonClick={handleServiceCollection} />
        <span className="divider"></span>
        <Payment onButtonClick={handlePaymentMethodCollection} />
        <span className="divider"></span>
        <button
          className={!isButtonClicked ? 'place-order' : 'order-placed'}
          disabled={isButtonClicked}
          onClick={event => handleSubmit(event)}
        >
          {!isButtonClicked ? (
            'Place order'
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Order placed
              <span className="material-symbols-outlined">done</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
