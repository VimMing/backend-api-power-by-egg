
const httpCalendarPic = require('./http/httpCalendarPic');

/**
 * get date object from year-month-day format string
 * @param {*} datestr
 */
function getDate(datestr) {
  const temp = datestr.split('-');
  const date = new Date(temp[0], temp[1] - 1, temp[2]);
  return date;
}

/**
 * sleep current task
 * @param {*} ms
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const start = '2021-04-07';
const end = '2021-04-08';
const startTime = getDate(start);
const endTime = getDate(end);

(async () => {
  while ((endTime.getTime() - startTime.getTime()) >= 0) {
    const year = startTime.getFullYear();
    const monthStr = startTime.getMonth() + 1;
    const month = monthStr.toString().length === 1 ? '0' + monthStr : monthStr;
    const day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate();
    const dateTime = year + '-' + month + '-' + day;
    console.log(dateTime);
    httpCalendarPic.CalendarAPI(dateTime);
    // startTime.setTime(startTime.getTime() + 24*60*60*1000);
    startTime.setDate(startTime.getDate() + 1);
    await wait(2000);
  }
})();

