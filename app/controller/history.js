'use strict';
const Controller = require('egg').Controller;

class HistoryController extends Controller {
  async baike() {
    const { ctx } = this;
    const month = ctx.query.month;
    const url = `https://baike.baidu.com/cms/home/eventsOnHistory/${month}.json?_=${new Date().getTime()}`;
    const result = await ctx.curl(url);
    ctx.status = result.status;
    const data = JSON.parse(Buffer.from(result.data).toString());
    ctx.body = data;
  }
  async getMonthEvents(month) {
    const { ctx } = this;
    const url = `https://baike.baidu.com/cms/home/eventsOnHistory/${month}.json?_=${new Date().getTime()}`;
    ctx.logger.info('month:', month);
    const result = await ctx.curl(url, {
      headers: {
        Accept: 'application/json, text/javascript, */*',
        Host: 'baike.baidu.com',
        Referer: 'https://baike.baidu.com/calendar',
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    // ctx.logger.info('result:', result);
    const data = JSON.parse(Buffer.from(result.data).toString());
    // ctx.logger.info('data:', data);
    // ctx.logger.info('data month:', data[month]);
    return data[month];
  }
  async getWhatHappenedFromGivenDate() {
    const { ctx } = this;
    // ctx.validate({ date: 'string' });
    const date = ctx.query.date;
    const events = await ctx.model.HistoryEvent.findByPk(date);
    // ctx.logger.info('events:', events);
    if (events) {
      ctx.body = events;
    } else {
      const monthEvents = await this.getMonthEvents(date.slice(0, 2));
      //   ctx.logger.info('monthEvents:', monthEvents);
      const keys = Object.keys(monthEvents);
      for (const k of keys) {
        await ctx.model.HistoryEvent.create({
          date: k,
          events: monthEvents[k],
        });
      }
      ctx.body = {
        date,
        events: monthEvents[date],
      };
    }
  }
}

module.exports = HistoryController;
