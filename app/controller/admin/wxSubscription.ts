import BaseController from '../base';
class WxSubscriptionController extends BaseController {
  modelName = 'WxSubscription';
  async getTodayPic() {
    const ctx = this.ctx;
    await this.service.movie.getTodayPic();
    ctx.body = { errCode: 0 };
  }
}

export default WxSubscriptionController;
