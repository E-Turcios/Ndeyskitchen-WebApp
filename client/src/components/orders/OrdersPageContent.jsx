import React from 'react';

export default function OrdersPageContent({ orders }) {
  console.log(orders);
  return (
    <div className="profile-content-container orders-content-container">
      <p className="cart-header profile-content-header orders-content-header">
        Orders
      </p>
      <div className="orders-cards-container">
        {orders.map(order => (
          <div className="order-card" key={order._id}>
            <p className="order-card-date">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="order-card-name">{`${order.firstName} ${order.lastName}`}</p>

            <div className="items-names">
              {order.items.map(item => (
                <p className="order-card-items-name" key={item.id}>
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
