function getDatesAndTimes(items) {
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  const dateString = date.toLocaleTimeString();
  let systemFormat;

  if (dateString.match(/am|pm/i) || date.toString().match(/am|pm/i)) {
    systemFormat = '12 hour';
  } else {
    systemFormat = '24 hour';
  }

  let minDay = new Date().getDate().toString();
  let maxDay = ((new Date().getDate() + 1) % daysInMonth).toString();

  let minMonth = (new Date().getMonth() + 1).toString();
  let maxMonth = (new Date().getMonth() + 1).toString();

  let minYear = new Date().getFullYear().toString();
  let maxYear = new Date().getFullYear().toString();

  let cakeMinDay = (new Date().getDate() + 3).toString();
  let cakeMaxMonth = ((new Date().getMonth() + 4) % 12).toString();
  let cakeMaxYear = new Date().getFullYear().toString();

  if (minDay.length === 1) minDay = '0' + minDay;
  if (maxDay.length === 1) maxDay = '0' + maxDay;

  if (minMonth.length === 1) minMonth = '0' + minMonth;
  if (maxMonth.length === 1) maxMonth = '0' + maxMonth;

  if (cakeMinDay.length === 1) cakeMinDay = '0' + cakeMinDay;
  if (cakeMaxMonth.length === 1) cakeMaxMonth = '0' + cakeMaxMonth;

  if (parseInt(maxMonth) < parseInt(minMonth))
    maxYear = (new Date().getFullYear() + 1).toString();

  if (parseInt(cakeMaxMonth) < parseInt(minMonth))
    cakeMaxYear = (new Date().getFullYear() + 1).toString();

  const minimumDate = `${minYear}-${minMonth}-${minDay}`;
  const maximumDate = `${maxYear}-${maxMonth}-${maxDay}`;

  const minimumTime = systemFormat !== '12 hour' ? '12:00' : '12:00 PM';
  const maximumTime = systemFormat !== '12 hour' ? '20:00' : '8:00 PM';

  const cakeMinimumDate = `${minYear}-${minMonth}-${cakeMinDay}`;
  const cakeMaximumDate = `${cakeMaxYear}-${cakeMaxMonth}-${maxDay}`;

  return {
    nonCake: { minimumDate, maximumDate, minimumTime, maximumTime },
    cake: {
      minimumDate: cakeMinimumDate,
      maximumDate: cakeMaximumDate,
      minimumTime,
      maximumTime,
    },
  };
}

module.exports = { getDatesAndTimes };
