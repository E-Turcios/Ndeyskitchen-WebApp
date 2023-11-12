import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from './CartCard';
import DateAndTime from './DateAndTime';
import Loader from '../Loader';
import useDatesAndTimes from '../../hooks/useDatesAndTimes';

export default function CartContainer() {
  const [cart, setCart] = useState([]);
  const [cakeSubtotals, setCakeSubtotals] = useState([]);
  const [nonCakeSubtotals, setNonCakeSubtotals] = useState([]);

  const [selectedDateTime, setSelectedDateTime] = useState({
    nonCake: { selectedDate: '', selectedTime: '' },
    cake: { selectedDate: '', selectedTime: '' },
  });

  const [total, setTotal] = useState(0);

  const { data } = useDatesAndTimes();

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    const newCakeSubtotals = cart
      .filter(item => item.filter === 'Cakes')
      .map(item => parseInt(item.quantity) * parseInt(item.price));

    const newNonCakeSubtotals = cart
      .filter(item => item.filter !== 'Cakes')
      .map(item => parseInt(item.quantity) * parseInt(item.price));

    setCakeSubtotals(newCakeSubtotals);
    setNonCakeSubtotals(newNonCakeSubtotals);

    const newTotal =
      newCakeSubtotals.reduce((acc, subtotal) => acc + subtotal, 0) +
      newNonCakeSubtotals.reduce((acc, subtotal) => acc + subtotal, 0);

    setTotal(newTotal);
  }, [cart]);

  function handleItemRemove(itemId) {
    const updatedCart = cart.filter(item => item.id !== itemId);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  function handleDateTimeChange(itemType, selectedDate, selectedTime) {
    setSelectedDateTime(prevState => ({
      ...prevState,
      [itemType]: {
        selectedDate,
        selectedTime,
      },
    }));
  }

  function handleCheckOutClick() {
    localStorage.setItem('total-price', JSON.stringify(total));
    localStorage.setItem(
      'non-cake-date-and-time',
      JSON.stringify(selectedDateTime.nonCake)
    );
    localStorage.setItem(
      'cake-date-and-time',
      JSON.stringify(selectedDateTime.cake)
    );
    navigate('/checkout');
  }

  if (!data) return <Loader />;

  return cart.length !== 0 ? (
    <form onSubmit={handleCheckOutClick} className="cart-body">
      <p className="cart-header">Cart</p>

      {cart.some(item => item.filter !== 'Cakes') && (
        <div className="cart-container">
          <DateAndTime
            minDate={data.nonCake.minimumDate}
            maxDate={data.nonCake.maximumDate}
            minTime={data.nonCake.minimumTime}
            maxTime={data.nonCake.maximumTime}
            minTimeMessage={data.minTimeMessage}
            maxTimeMessage={data.maxTimeMessage}
            onChange={(date, time) =>
              handleDateTimeChange('nonCake', date, time)
            }
          />
          {cart
            .filter(item => item.filter !== 'Cakes')
            .map((item, index) => (
              <CartCard
                key={item.id}
                item={item}
                index={index}
                subtotals={nonCakeSubtotals}
                handleClick={handleItemRemove}
              />
            ))}
        </div>
      )}

      {cart.some(item => item.filter === 'Cakes') && (
        <div className="cart-container">
          <DateAndTime
            minDate={data.cake.minimumDate}
            maxDate={data.cake.maximumDate}
            minTime={data.cake.minimumTime}
            maxTime={data.cake.maximumTime}
            minTimeMessage={data.minTimeMessage}
            maxTimeMessage={data.maxTimeMessage}
            onChange={(date, time) => handleDateTimeChange('cake', date, time)}
          />
          {cart
            .filter(item => item.filter === 'Cakes')
            .map((item, index) => (
              <CartCard
                key={item.id}
                item={item}
                index={index}
                subtotals={cakeSubtotals}
                handleClick={handleItemRemove}
              />
            ))}
        </div>
      )}

      <div className="total">
        <p className="total-text"> Total:</p>
        <p className="total-price">D {total}</p>
      </div>

      <button className="checkout-btn" type="submit">
        Checkout
      </button>
    </form>
  ) : (
    <div className="no-item-container">
      <p>Cart is empty.</p>
    </div>
  );
}
