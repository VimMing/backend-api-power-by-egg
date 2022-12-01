// const Controller = require('egg').Controller;
import { Controller, Context, IModel } from 'egg';
import { getWhereClauses } from '../utils';
abstract class BaseController extends Controller {
  ctx: Context<{
    data?: any;
    errCode: number;
    errMsg?: string;
  }>;
  abstract modelName: keyof IModel;

  async list() {
    const ctx = this.ctx;
    const { page = 1, limit = 20, __searchForm = [] } = ctx.request.body;
    const list = await ctx.model[this.modelName].findAll({
      where: getWhereClauses(__searchForm),
      limit,
      offset: (page - 1) * limit,
    });
    const amount = await ctx.model[this.modelName].count({
      where: getWhereClauses(__searchForm),
    });
    ctx.body = { data: { list, amount, page }, errCode: 0 };
  }
}

export default BaseController;
