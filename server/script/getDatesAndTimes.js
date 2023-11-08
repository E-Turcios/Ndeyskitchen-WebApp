function getDatesAndTimes({ item }) {
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
  const minimumTime = '12:00';
  const maximumTime = '20:00';

  return { maximumDate, minimumDate, minimumTime, maximumTime };
}

module.exports = { getDatesAndTimes };
