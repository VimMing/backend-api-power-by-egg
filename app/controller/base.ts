// const Controller = require('egg').Controller;
import { Controller, Context } from 'egg';
class BaseController extends Controller {
  ctx: Context<{
    data?: any;
    errCode: number;
    errMsg?: string;
  }>;
}

export default BaseController;
