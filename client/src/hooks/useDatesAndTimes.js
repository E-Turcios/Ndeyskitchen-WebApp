import { useState, useEffect } from 'react';

export default function useDatesAndTimes() {
  const [data, setData] = useState('');
  useEffect(() => {
    async function fetchDatesAndTimes() {
      const response = await fetch('/api/items/get-dates-and-times', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.status);
        return;
      }

      setData(json);
    }

    fetchDatesAndTimes();
  }, []);
  return { data };
}
