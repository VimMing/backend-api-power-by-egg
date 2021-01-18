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
    const result = await ctx.curl(url);
    const data = JSON.parse(Buffer.from(result.data).toString());
    return data[month];
  }
  async getWhatHappenedFromGivenDate() {
    const { ctx } = this;
    // ctx.validate({ date: 'string' });
    const date = ctx.query.date;
    const events = await ctx.model.HistoryEvent.findByPk(date);
    ctx.logger.info('events:', events);
    if (events) {
      ctx.body = events;
    } else {
      const monthEvents = await this.getMonthEvents(date.slice(0, 2));
      ctx.logger.info('monthEvents:', monthEvents);
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
