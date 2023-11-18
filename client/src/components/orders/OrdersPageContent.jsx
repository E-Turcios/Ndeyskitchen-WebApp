import React from 'react';
import truncateComponentList from '../../scripts/truncateComponentList';

export default function OrdersPageContent({ orders }) {
  //console.log(orders);
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
            <p className="order-card-user-name">{`${order.firstName} ${order.lastName}`}</p>

            {order.items.map(item => (
              <div className="items-names-components" key={item.id}>
                <div className="name-price-container">
                  <p className="order-card-item-name">{item.name}</p>
                  <p className="price-quantity-tag">{`${item.quantity} x D ${item.price}`}</p>
                </div>

                <p className="order-card-item-components">
                  {truncateComponentList(item.components, 55)}
                </p>
              </div>
            ))}

            <p className="order-total">{`Total: D ${order.total}`}</p>
            <button>Reorder</button>
            <span className="divider"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
