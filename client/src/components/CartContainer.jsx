import React from 'react';
import Image from './Image';

export default function CartContainer() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);

  return cart ? (
    <div className="cart-body">
      <p className="cart-header">Cart</p>

      <div className="cart-container">
        <div className="cart-card">
          <div className="cart-image-container">
            <Image
              src={cart[0].image}
              alt={cart[0].alt}
              className="cart-item-image"
            />
          </div>
          <div className="cart-item-information">
            <div className="cart-name-price">
              <p className="cart-item-name">{cart[0].name}</p>

              <p className="cart-item-price">D {cart[0].price}</p>
            </div>

            <p className="cart-item-components">
              Components: {cart[0].components}
            </p>

            <p>Size: {cart[0].size}</p>
            <p>Quantity: {cart[0].quantity}</p>

            <p className="item-remove">Remove</p>
          </div>
        </div>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  ) : (
    <div className="no-item-container">
      <p>Cart is empty</p>
    </div>
  );
}
