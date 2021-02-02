'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');
class WxService extends Service {
  async getAccessToken() {
    const { key: appId, secret: appSecert, host } = this.app.config.passportWeapp;
    return new Promise(async resolve => {
      const currentTime = new Date().getTime();

      const redisToken = await this.app.redis.get('wxtoken_token') || '{"access_token": "", "expries_time": 0}';
      //   this.ctx.logger.info(redisToken);
      const accessTokenJson = JSON.parse(redisToken);

      if (accessTokenJson.access_token === '' || accessTokenJson.expries_time < currentTime) {
        const res = await this.ctx.curl(`${host}/cgi-bin/token?appid=${appId}&secret=${appSecert}&grant_type=client_credential`, { dataType: 'json' });
        if (res.data) {
          accessTokenJson.access_token = res.data.access_token;
          accessTokenJson.expries_time = new Date().getTime() + (parseInt(res.data.expires_in) - 200) * 1000;
          await this.app.redis.set('wxtoken_token', JSON.stringify(accessTokenJson));
          resolve(accessTokenJson);
        }
      } else {
        resolve(accessTokenJson);
      }
    });
  }
  async sendBirthdayNotice() {
    // todo
    const { ctx } = this;
    const start = new Date();
    const end = new Date();
    start.setSeconds(0);
    start.setMinutes(0);
    start.setHours(0);
    end.setSeconds(59);
    end.setMinutes(59);
    end.setHours(23);
    const WxSubscription = ctx.model.WxSubscription;
    const User = ctx.model.User;
    User.hasMany(WxSubscription);
    WxSubscription.belongsTo(User);
    const res = await ctx.model.WxSubscription.findAll({
      where: {
        when: {
          [Op.and]: {
            [Op.lte]: end,
            [Op.gte]: start,
          },
        },
      },
      include: ctx.model.User,
    });
    return res;
    // const requestData = {
    //   touser: 'oJzdG42QHZDLqDcHbvNs9xu8gMzs',
    //   template_id: 'E3YdVL8G4BZaFJ9ORfp6-nKtRhB1oyh-HWM8zKJpjj8',
    //   page: '/pages/index/index',
    //   data: {
    //     time1: {
    //       value: '2019年10月1日',
    //     },
    //     thing3: {
    //       value: '佘慧民',
    //     },
    //     thing2: {
    //       value: 'xxx',
    //     },
    //   },
    // };

    // const { host } = this.app.config.passportWeapp;
    // // 获取access_token
    // const tokenJson = await this.getAccessToken();
    // const res = await this.ctx.curl(`${host}/cgi-bin/message/subscribe/send?access_token=${tokenJson.access_token}
    // `, {
    //   method: 'POST',
    //   contentType: 'json',
    //   data: requestData,
    //   dataType: 'json',
    // });

    // if (res.data.errmsg === 'ok') {
    //   ctx.logger.info('========推送成功========');
    //   // TODO
    // } else {
    //   ctx.logger.info('========推送失败========', res.data);
    //   // TODO
    // }
  }
}

module.exports = WxService;
