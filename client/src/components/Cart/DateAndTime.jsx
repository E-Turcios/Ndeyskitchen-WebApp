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

  const minDateArray = minDate.split('-');
  const maxDateArray = maxDate.split('-');
  console.log(minDateArray);

  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

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
          onInvalid={e =>
            e.target.setCustomValidity(
              `Date must be between ${months[minDateArray[1]]} ${
                minDateArray[2]
              }, ${minDateArray[0]} and ${months[maxDateArray[1]]} ${
                maxDateArray[2]
              }, ${maxDateArray[0]}`
            )
          }
          onInput={e => e.target.setCustomValidity('')}
          required
        />

        <input
          type="time"
          min={minTime}
          max={maxTime}
          value={time}
          onChange={handleTimeChange}
          onInvalid={e =>
            e.target.setCustomValidity(
              `Time must be between ${minTime} and ${maxTime}`
            )
          }
          onInput={e => e.target.setCustomValidity('')}
          required
        />
      </div>
    </div>
  );
}
