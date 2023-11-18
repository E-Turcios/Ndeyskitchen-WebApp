import { useState, useEffect } from 'react';
import useAuthContext from './useAuthContext';

export default function useFetchedUserOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();

  useEffect(() => {
    async function getOrders() {
      if (!user) return;

      const response = await fetch('/api/orders/get-user-orders', {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) console.log(json.Message);

      setOrders(json);
      setIsLoading(false);
    }
    getOrders();
  }, [user]);
  return { orders, isLoading };
}
