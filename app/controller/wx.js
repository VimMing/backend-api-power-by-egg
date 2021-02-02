'use strict';
const Controller = require('egg').Controller;

class WxController extends Controller {

  async addBirthdayNotice() {
    const { ctx } = this;
    ctx.validate({ when: 'date', birthdayId: 'int' });
    const body = ctx.request.body;
    const friend = await ctx.model.MyFriend.findByPk(+body.birthdayId);
    ctx.logger.info(friend);
    ctx.model.WxSubscription.create({
      userId: ctx.user.id,
      name: 'birthdayNotice',
      when: body.when,
      content: friend,
      templateId: 'E3YdVL8G4BZaFJ9ORfp6-nKtRhB1oyh-HWM8zKJpjj8',
      status: 0,
    });
    ctx.body = {
      errCode: 0,
    };
  }

  async sendBirthdayNotice() {
    const { ctx } = this;
    const res = await ctx.service.wx.sendBirthdayNotice();
    ctx.body = { errCode: 0, data: res };
  }
}

module.exports = WxController;
