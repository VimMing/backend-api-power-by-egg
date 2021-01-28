'use strict';

const Service = require('egg').Service;
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
}

module.exports = WxService;
