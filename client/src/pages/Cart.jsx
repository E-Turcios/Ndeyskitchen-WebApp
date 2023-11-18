import React from 'react';
import CartNavbar from '../components/cart/CartNavbar';
import CartContainer from '../components/cart/CartContainer';

export default function Cart() {
  return (
    <div className="cart-page-container">
      <CartNavbar />
      <CartContainer />
    </div>
  );
}
