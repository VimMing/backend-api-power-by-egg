

const Controller = require('egg').Controller;
class UserController extends Controller {
  async list() {
    const ctx = this.ctx;
    const { list, amount } = await this.service.user.list(ctx.request.body);
    ctx.body = { data: list, errCode: 0, total: amount };
  }
}

module.exports = UserController;
