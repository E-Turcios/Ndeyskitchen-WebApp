import { React, useState } from 'react';

export default function DateAndTime({ item }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  let minDay = new Date().getDate().toString();
  let maxDay = (new Date().getDate() + 1).toString();

  let minMonth = (new Date().getMonth() + 1).toString();
  let maxMonth = (new Date().getMonth() + 1).toString();

  let minYear = new Date().getFullYear().toString();
  let maxYear = new Date().getFullYear().toString();

  if (item.filter === 'Cakes') {
    minDay = (new Date().getDate() + 3).toString();
    maxMonth = ((new Date().getMonth() + 4) % 12).toString();
  }

  if (minDay.length === 1) minDay = '0' + minDay;
  if (maxDay.length === 1) maxDay = '0' + maxDay;

  if (minMonth.length === 1) minMonth = '0' + minMonth;
  if (maxMonth.length === 1) maxMonth = '0' + maxMonth;

  if (parseInt(maxMonth) < parseInt(minMonth))
    maxYear = (new Date().getFullYear() + 1).toString();

  const minimumDate = `${minYear + `-` + minMonth + `-` + minDay}`;
  const maximumDate = `${maxYear + `-` + maxMonth + `-` + maxDay}`;

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
