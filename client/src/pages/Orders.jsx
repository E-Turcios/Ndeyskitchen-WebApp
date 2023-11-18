import React from 'react';
import ProfileAndOrderPagesNavbar from '../components/ProfileAndOrderPagesNavbar';
import OrdersPageContent from '../components/orders/OrdersPageContent';

export default function Orders() {
  return (
    <div className="orders-page-container">
      <ProfileAndOrderPagesNavbar />
      <OrdersPageContent />
    </div>
  );
}
