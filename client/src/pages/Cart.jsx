import React from 'react';
import CartNavbar from '../components/Cart/CartNavbar';
import CartContainer from '../components/Cart/CartContainer';

export default function Cart() {
  return (
    <div className="cart-page-container">
      <CartNavbar />
      <CartContainer />
    </div>
  );
}
