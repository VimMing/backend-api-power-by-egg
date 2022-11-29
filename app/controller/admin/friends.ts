import BaseController from '../base';
import { getWhereClauses } from '../../utils';
class FriendsController extends BaseController {
  async list() {
    const ctx = this.ctx;
    const { page = 1, limit = 20, __searchForm = [] } = ctx.request.body;
    const list = await ctx.model.MyFriend.findAll({
      where: getWhereClauses(__searchForm),
      limit,
      offset: (page - 1) * limit,
    });
    const amount = await ctx.model.MyFriend.count({
      where: getWhereClauses(__searchForm),
    });
    ctx.body = { data: { list, amount, page }, errCode: 0 };
  }
}

export default FriendsController;
