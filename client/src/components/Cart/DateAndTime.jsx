import { React, useState } from 'react';

export default function DateAndTime({
  minDate,
  maxDate,
  minTime,
  maxTime,
  onChange,
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  function handleDateChange(event) {
    setDate(event.target.value);
    onChange(event.target.value, time);
  }

  function handleTimeChange(event) {
    setTime(event.target.value);
    onChange(date, event.target.value);
  }

  return (
    <div className="date-time-component">
      <p className="tag">Select Date & Time</p>
      <div className="date-and-time-container">
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={date}
          onChange={handleDateChange}
          required
        />

        <input
          type="time"
          min={minTime}
          max={maxTime}
          value={time}
          onChange={handleTimeChange}
          required
        />
      </div>
    </div>
  );
}
