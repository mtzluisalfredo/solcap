import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const getCurrentRangeMonth = () => {
  const dates =  {
    from: null,
    to: null,
  };

  return dates;
};
export const getInitDateSelected = () => {
  return { day: dayjs().date(), month: dayjs().month() + 1, year: dayjs().year() };
};
