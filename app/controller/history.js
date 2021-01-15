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
}

module.exports = HistoryController;
