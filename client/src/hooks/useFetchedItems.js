import { React, useState, useEffect } from 'react';

export default function useFetchedItems() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      const response = await fetch('api/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) console.log(json.Message);

      setItems(json);
      setIsLoading(false);
    }
    getItems();
  }, []);
  return { items, isLoading };
}
