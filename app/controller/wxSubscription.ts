import BaseController from './base';
class WxSubscriptionController extends BaseController {
  modelName = 'WxSubscription';
  async destory() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    if (!id) {
      throw {
        message: 'id参数缺失',
        status: 400,
      };
    }
    const notice = await ctx.model.WxSubscription.findOne({
      where: {
        id,
        userId: ctx.user.id,
      },
    });
    if (notice) {
      await notice.destroy();
      ctx.body = {
        errCode: 0,
      };
    } else {
      ctx.throw('数据不存在', 400);
    }
    ctx.body = { errCode: 0 };
  }
}

export default WxSubscriptionController;
