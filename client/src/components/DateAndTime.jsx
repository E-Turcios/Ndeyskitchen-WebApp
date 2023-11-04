import { React, useState } from 'react';

export default function DateAndTime({ item }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  let day = new Date().getDate().toString();

  let minMonth = (new Date().getMonth() + 1).toString();
  let maxMonth = ((new Date().getMonth() + 4) % 12).toString();

  let minYear = new Date().getFullYear().toString();
  let maxYear = new Date().getFullYear().toString();

  if (item.filter === 'Cakes') day = (new Date().getDate() + 3).toString();

  if (day.length === 1) day = '0' + day;

  if (minMonth.length === 1) minMonth = '0' + minMonth;

  if (maxMonth.length === 1) maxMonth = '0' + maxMonth;

  if (parseInt(maxMonth) < parseInt(minMonth))
    maxYear = (new Date().getFullYear() + 1).toString();

  const minimumDate = `${minYear + `-` + minMonth + `-` + day}`;
  const maximumDate = `${maxYear + `-` + maxMonth + `-` + day}`;

  console.log(maximumDate);

  return (
    <div>
      <p className="tag">Select Date & Time</p>
      <div className="date-and-time-container">
        <input
          type="date"
          min={minimumDate}
          max={maximumDate}
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
