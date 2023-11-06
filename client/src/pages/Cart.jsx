import React from 'react';
import CartNavbar from '../components/CartNavbar';
import CartContainer from '../components/CartContainer';

export default function Cart() {
  return (
    <div className="cart-page-container">
      <CartNavbar />
      <CartContainer />
    </div>
  );
}
