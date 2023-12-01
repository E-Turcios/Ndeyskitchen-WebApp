import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import useAuthContext from '../../hooks/useAuthContext';

export default function OrdersPageContent({ orders, isLoading }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  function handleClick(order) {
    localStorage.setItem('cart', JSON.stringify(order.items));
    navigate('/cart');
  }

  return (
    <div className="profile-content-container orders-content-container">
      <p className="cart-header profile-content-header orders-content-header">
        Orders
      </p>
      <div className="orders-cards-container">
        {!user && (
          <div className="no-orders-container">
            <p>No orders.</p>
            <a href="/signup">Signup to see or your orders history.</a>
          </div>
        )}

        {user && isLoading ? (
          <Loader />
        ) : !orders ? (
          <div className="no-orders-container">
            <p>No orders.</p>
            <a href="/signup">Signup to see your order history.</a>
          </div>
        ) : (
          orders.map(order => (
            <div className="order-card" key={order._id}>
              <p className="order-card-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="order-card-user-name">{`${order.firstName} ${order.lastName}`}</p>

              {order.items.map(item => (
                <div className="items-names-components" key={item.id}>
                  <div className="name-price-container">
                    <p className="order-card-item-name">{item.name}</p>
                    <p className="price-quantity-tag">{`${item.quantity} x D ${item.price}`}</p>
                  </div>
                </div>
              ))}

              <p className="order-total">{`Total: D ${order.total}`}</p>
              <button onClick={() => handleClick(order)}>Reorder</button>
              <span className="divider"></span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
