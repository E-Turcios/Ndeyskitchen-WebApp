import { React, useState } from 'react';

export default function DateAndTime() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  let day = (new Date().getDate() + 1).toString();
  let month = (new Date().getMonth() + 1).toString();
  const year = new Date().getFullYear().toString();

  if (day.length === 1) day = '0' + day;

  const minimumDate = `${year + `-` + month + `-` + day}`;

  return (
    <div>
      <p className="tag">Select Date & Time</p>
      <div className="date-and-time-container">
        <input
          type="date"
          min={minimumDate}
          onChange={event => setDate(event.target.value)}
        />
        <input
          type="time"
          step="3600"
          onChange={event => setTime(event.target.value)}
        />
      </div>
    </div>
  );
}
