import { React, useState } from 'react';
import CheckoutNavbar from '../components/checkout/CheckoutNavbar.jsx';
import Information from '../components/checkout/Information.jsx';
import Service from '../components/checkout/Service.jsx';

export default function Checkout() {
  const [service, setService] = useState('');
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

  console.log(userData);

  return (
    <div className="checkout-page-container">
      <CheckoutNavbar />
      <div className="checkout-content-container">
        <p className="checkout-header">Checkout</p>
        <Information onFormChange={handleUserInfoCollection} />
        <Service onButtonClick={handleServiceCollection} />
      </div>
    </div>
  );
}
