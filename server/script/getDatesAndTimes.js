function getDatesAndTimes(items) {
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

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
  const minimumTime = '12:00';
  const maximumTime = '20:00';

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
