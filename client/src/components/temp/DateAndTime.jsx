import React, { useState, useEffect } from 'react';

export default function DateAndTime({
  minDate,
  maxDate,
  minTime,
  maxTime,
  minTimeMessage,
  maxTimeMessage,
  onChange,
}) {
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

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [lastTime, setLastTime] = useState('');

  const minDateArray = minDate.split('-');
  const maxDateArray = maxDate.split('-');

  useEffect(() => {
    if (!dateError && !timeError && date && time) {
      if (date !== lastDate || time !== lastTime) {
        onChange(date, time);
        setLastDate(date);
        setLastTime(time);
      }
    }
  }, [date, time, dateError, timeError, onChange, lastDate, lastTime]);

  function handleDateChange(event) {
    setDate(event.target.value);
    setDateError(false);
  }

  function handleTimeChange(event) {
    setTime(event.target.value);
    setTimeError(false);
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
          onInvalid={event => {
            event.preventDefault();
            setDateError(true);
            event.target.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
          onInput={() => setDateError(false)}
          required
        />

        <input
          type="time"
          min={minTime}
          max={maxTime}
          value={time}
          onChange={handleTimeChange}
          onInvalid={event => {
            event.preventDefault();
            setTimeError(true);
            event.target.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
          onInput={() => setTimeError(false)}
          required
        />
      </div>

      {(dateError || timeError) && (
        <div className="date-time-error-message-container">
          {dateError && (
            <span>
              <p>
                Date must be between{' '}
                <span className="date-and-time-error-message-span">
                  {months[minDateArray[1]]}{' '}
                </span>
                <span className="date-and-time-error-message-span">
                  {minDateArray[2]},{' '}
                </span>
                <span className="date-and-time-error-message-span">
                  {minDateArray[0]}
                </span>
                <span> and </span>
                <span className="date-and-time-error-message-span">
                  {months[maxDateArray[1]]}{' '}
                </span>
                <span className="date-and-time-error-message-span">
                  {maxDateArray[2]},{' '}
                </span>
                <span className="date-and-time-error-message-span">
                  {maxDateArray[0]}
                </span>
              </p>
            </span>
          )}
          {timeError && (
            <span>
              <p>
                Time must be between{' '}
                <span className="date-and-time-error-message-span">
                  {minTimeMessage}
                </span>
                <span> and </span>
                <span className="date-and-time-error-message-span">
                  {maxTimeMessage}
                </span>
              </p>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
