'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async list() {
    const ctx = this.ctx;
    ctx.body = { data: await this.service.user.list(ctx.request.body), errCode: 0 };
  }
}

module.exports = UserController;
