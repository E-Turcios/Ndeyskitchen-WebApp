import { React, useState } from 'react';
import CheckoutNavbar from '../components/checkout/CheckoutNavbar.jsx';
import Information from '../components/checkout/Information.jsx';
import Service from '../components/checkout/Service.jsx';
import Payment from '../components/checkout/Payment.jsx';

export default function Checkout() {
  const [service, setService] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
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

  function handlePlaceOrderClick() {}

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
        <button className="place-order">Place order</button>
      </form>
    </div>
  );
}
