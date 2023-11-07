import React from 'react';
import Image from './Image';

export default function CartContainer() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);

  return cart ? (
    <div className="cart-body">
      <p className="cart-header">Cart</p>

      <div className="cart-container">
        {cart.map(item => (
          <div className="card-container">
            <div className="cart-card" key={item.name}>
              <div className="cart-image-container">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="cart-item-image"
                />
              </div>
              <div className="cart-item-information">
                <div className="cart-name-price">
                  <p className="cart-item-name">{item.name}</p>

                  <p className="cart-item-price">D {item.price}</p>
                </div>

                <p className="cart-item-components">
                  Components: {item.components}
                </p>

                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>

                <p className="item-remove">Remove</p>
              </div>
            </div>
            <div className="divider-container">
              <span className="divider"></span>
            </div>
          </div>
        ))}
      </div>

      <button className="checkout-btn">Checkout</button>
    </div>
  ) : (
    <div className="no-item-container">
      <p>Cart is empty</p>
    </div>
  );
}
