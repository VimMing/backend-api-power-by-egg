'use strict';
const Controller = require('egg').Controller;

class WxController extends Controller {

  async addBirthdayNotice() {
    const { ctx } = this;
    ctx.validate({ when: 'date', birthdayId: 'int' });
    const body = ctx.request.body;
    ctx.model.WxSubscription.create({
      userId: ctx.user.id,
      name: 'birthdayNotice',
      when: body.when,
      content: ctx.model.MyFriend.findByPk(body.birthdayId),
      templateId: 'E3YdVL8G4BZaFJ9ORfp6-nKtRhB1oyh-HWM8zKJpjj8',
      status: 0,
    });
    ctx.body = {
      errCode: 0,
    };
  }
}

module.exports = WxController;
