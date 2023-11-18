import React from 'react';
import ProfileAndOrderPagesNavbar from '../components/ProfileAndOrderPagesNavbar';
import OrdersPageContent from '../components/orders/OrdersPageContent';
import Loader from '../components/Loader';
import useFetchedUserOrders from '../hooks/useFetchedUserOrders';

export default function Orders() {
  const { orders, isLoading } = useFetchedUserOrders();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="orders-page-container">
      <ProfileAndOrderPagesNavbar />
      <OrdersPageContent orders={orders} />
    </div>
  );
}
