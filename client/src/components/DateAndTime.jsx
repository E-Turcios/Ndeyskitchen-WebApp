import { React, useState, useEffect } from 'react';

export default function DateAndTime({ item, getDateAndTime }) {
  const [dates, setDates] = useState({
    minimumDate: '',
    maximumDate: '',
    minimumTime: '',
    maximumTime: '',
  });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    async function fetchDatesAndTimes() {
      const response = await fetch('/api/items/get-dates-and-times', {
        method: 'POST',
        body: JSON.stringify({ item: item }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.status);
        return;
      }

      setDates({
        minimumDate: json.minimumDate,
        maximumDate: json.maximumDate,
        minimumTime: json.minimumTime,
        maximumTime: json.maximumTime,
      });

      console.log(json);
    }

    fetchDatesAndTimes();
  }, []);

  return (
    <div>
      {getDateAndTime(date, time)}
      <p className="tag">Select Date & Time</p>
      <div className="date-and-time-container">
        <input
          type="date"
          min={dates.minimumDate}
          max={dates.maximumDate}
          onChange={event => setDate(event.target.value)}
          required
        />

        <input
          type="time"
          onChange={event => setTime(event.target.value)}
          required
          min={dates.minimumTime}
          max={dates.maximumTime}
        />
      </div>
    </div>
  );
}
