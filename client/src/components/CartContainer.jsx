import { React, useState, useEffect } from 'react';
import Image from './Image';

export default function CartContainer() {
  const [cart, setCart] = useState([]);
  const [subtotals, setSubtotals] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));

    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    const newSubtotals = cart.map(
      item => parseInt(item.quantity) * parseInt(item.price)
    );

    setSubtotals(newSubtotals);

    const newTotal = newSubtotals.reduce((acc, subtotal) => acc + subtotal, 0);
    setTotal(newTotal);
  }, [cart]);

  function handleClick(itemId) {
    const removedItem = cart.find(item => item.id === itemId);
    const updatedCart = cart.filter(item => item.id !== itemId);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const removedSubtotal =
      parseInt(removedItem.quantity) * parseInt(removedItem.price);
    setTotal(total - removedSubtotal);
  }

  function handleCheckOutClick() {
    localStorage.setItem('total', JSON.stringify(total));
  }

  return cart.length !== 0 ? (
    <div className="cart-body">
      <p className="cart-header">Cart</p>

      <div className="cart-container">
        {cart.map((item, index) => (
          <div className="card-container" key={item.id}>
            <div className="cart-card">
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

                <p className="cart-item-components">{item.components}</p>

                <p>{item.size}</p>

                <p> Sub total: </p>
                <p>
                  {item.quantity} x D {item.price} = D {subtotals[index]}
                </p>

                <p className="item-remove" onClick={() => handleClick(item.id)}>
                  Remove
                </p>
              </div>
            </div>
            <div className="divider-container">
              <span className="divider"></span>
            </div>
          </div>
        ))}
      </div>

      <div className="total">
        <p className="total-text"> Total:</p>
        <p className="total-price">D {total}</p>
      </div>

      <button className="checkout-btn" onClick={handleCheckOutClick}>
        Checkout
      </button>
    </div>
  ) : (
    <div className="no-item-container">
      <p>Cart is empty.</p>
    </div>
  );
}
