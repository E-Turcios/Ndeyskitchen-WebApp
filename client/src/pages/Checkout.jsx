import React from 'react';
import CheckoutNavbar from '../components/checkout/CheckoutNavbar.jsx';
import CheckoutPageContent from '../components/checkout/CheckoutPageContent.jsx';

export default function Checkout() {
  return (
    <div className="checkout-page-container">
      <CheckoutNavbar />
      <CheckoutPageContent />
    </div>
  );
}
