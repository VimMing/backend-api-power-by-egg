const Controller = require('egg').Controller;
import { lunarToSolar } from '../utils';

class CommonController extends Controller {
  async lunarToSolar() {
    const { ctx } = this;
    ctx.validate({ year: 'int', month: 'int', day: 'int' });
    const body = ctx.request.body;
    ctx.body = {
      errCode: 0,
      data: lunarToSolar(body.year, body.month, body.day),
    };
  }
}

module.exports = CommonController;
