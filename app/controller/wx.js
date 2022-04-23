
const Controller = require('egg').Controller;

class WxController extends Controller {

  async addBirthdayNotice() {
    const { ctx } = this;
    ctx.validate({ when: 'dateTime', birthdayId: 'int' });
    const body = ctx.request.body;
    if (body.id) {
      const wxSubscription = await ctx.model.WxSubscription.findByPk(+body.id);
      ctx.logger.info('userid: ', ctx.isAuthenticated(), ctx.user.id, wxSubscription.userId);
      if (wxSubscription && wxSubscription.userId === ctx.user.id) {
        wxSubscription.update({
          when: body.when,
          status: 0,
        });
        ctx.body = {
          errCode: 0,
        };
      } else {
        ctx.body = {
          errCode: 1,
          errMsg: '订阅不存在或无权限',
        };
      }
    } else {
      const friend = await ctx.model.MyFriend.findByPk(+body.birthdayId);
      // ctx.logger.info(friend);
      ctx.model.WxSubscription.create({
        userId: ctx.user.id,
        name: 'birthdayNotice',
        when: body.when,
        content: friend,
        eventId: +body.birthdayId,
        templateId: 'E3YdVL8G4BZaFJ9ORfp6-nKtRhB1oyh-HWM8zKJpjj8',
        status: 0,
      });
      ctx.body = {
        errCode: 0,
      };
    }

  }

  async activeNoticeAgain() {
    const { ctx } = this;
    ctx.validate({ when: 'dateTime', id: 'int' });
    const body = ctx.request.body;
    const wxSubscription = await ctx.model.WxSubscription.findByPk(body.id);
    if (wxSubscription) {
      wxSubscription.update({
        when: body.when,
        status: 0,
      });
      ctx.body = {
        errCode: 0,
      };
    } else {
      ctx.body = {
        errCode: 1,
      };
    }
  }

  async sendBirthdayNotice() {
    const { ctx } = this;
    const res = await ctx.service.wx.sendBirthdayNotice();
    ctx.body = { errCode: 0, data: res };
  }

  async list() {
    const { ctx } = this;
    ctx.validate({ birthdayId: 'int' });
    const body = ctx.request.body;
    const res = await ctx.model.WxSubscription.findAll({
      where: {
        eventId: body.birthdayId,
        userId: ctx.user.id,
        name: 'birthdayNotice',
      },
    });
    ctx.body = { errCode: 0, data: res };
  }
}

module.exports = WxController;
