import BaseController from '../base';

class UserController extends BaseController {
  async list() {
    const ctx = this.ctx;
    const { list, amount, page } = await this.service.user.list(
      ctx.request.body
    );
    ctx.body = { data: { list, amount, page }, errCode: 0 };
  }
}

export default UserController;
