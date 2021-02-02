'use strict';
const LunarCalendar = require('lunar-calendar');
function lunarToSolar(y, m, d) {
  //
  const map = { 2020: 4, 2023: 2, 2025: 6, 2028: 5, 2031: 3, 2033: 11, 2036: 6, 2039: 5, 2042: 2 };
  // eslint-disable-next-line prefer-const
  let ly = y - 1,
    lm = m;
  if (map[ly] && map[ly] < lm) {
    lm = lm + 1;
  }
  if (map[y] && map[y] < m) {
    m = m + 1;
  }
  const l_s = LunarCalendar.lunarToSolar(ly, lm, d);
  if (parseInt(l_s.year) === parseInt(y)) {
    return l_s;
  }

  return LunarCalendar.lunarToSolar(y, m, d);
}

function formatTime(s, m, h, d, M, y) {
  const t = new Date();
  if (s != null) {
    t.setSeconds(s);
  }
  if (m != null) {
    t.setMinutes(m);
  }
  if (h != null) {
    t.setHours(h);
  }
  if (d != null) {
    t.setDate(d);
  }
  return t;
}
module.exports = {
  lunarToSolar,
  formatTime,
};

