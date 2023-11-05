import { React, useState } from 'react';
import dateAndTime from '../scripts/dateAndTime';

export default function DateAndTime({ item }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [value, onChange] = useState('10:00');

  const { minimumDate, maximumDate, minimumTime, maximumTime } = dateAndTime({
    item,
  });

  return (
    <div>
      <p className="tag">Select Date & Time</p>
      <div className="date-and-time-container">
        <input
          type="date"
          min={minimumDate}
          max={maximumDate}
          onChange={event => setDate(event.target.value)}
          required
        />

        <input
          type="time"
          step="3600"
          min={minimumTime}
          max={maximumTime}
          onChange={event => setTime(event.target.value)}
          required
        />
      </div>
    </div>
  );
}
