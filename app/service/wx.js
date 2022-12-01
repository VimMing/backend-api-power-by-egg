const Service = require('egg').Service;
const { Op } = require('sequelize');
// const utils = require('../utils.ts');
const { lunarToSolar, formatTime } = require('../utils');
class WxService extends Service {
  async getAccessToken() {
    const {
      key: appId,
      secret: appSecert,
      host,
    } = this.app.config.passportWeapp;
    return new Promise(async (resolve) => {
      const currentTime = new Date().getTime();

      const redisToken =
        (await this.app.redis.get('wxtoken_token')) ||
        '{"access_token": "", "expries_time": 0}';
      //   this.ctx.logger.info(redisToken);
      const accessTokenJson = JSON.parse(redisToken);

      if (
        accessTokenJson.access_token === '' ||
        accessTokenJson.expries_time < currentTime
      ) {
        const res = await this.ctx.curl(
          `${host}/cgi-bin/token?appid=${appId}&secret=${appSecert}&grant_type=client_credential`,
          { dataType: 'json' }
        );
        if (res.data) {
          accessTokenJson.access_token = res.data.access_token;
          accessTokenJson.expries_time =
            new Date().getTime() + (parseInt(res.data.expires_in) - 200) * 1000;
          await this.app.redis.set(
            'wxtoken_token',
            JSON.stringify(accessTokenJson)
          );
          resolve(accessTokenJson);
        }
      } else {
        resolve(accessTokenJson);
      }
    });
  }
  async send(requestData, model) {
    const { host } = this.app.config.passportWeapp;
    // 获取access_token
    const tokenJson = await this.getAccessToken();
    const res = await this.ctx.curl(
      `${host}/cgi-bin/message/subscribe/send?access_token=${tokenJson.access_token}
    `,
      {
        method: 'POST',
        contentType: 'json',
        data: requestData,
        dataType: 'json',
      }
    );

    if (res.data.errmsg === 'ok') {
      await model.update({
        status: 1,
        ErrMessage: '========推送成功========',
      });
    } else {
      await model.update({
        status: 2,
        ErrMessage: res.data.errmsg,
      });
    }
  }
  async sendBirthdayNotice() {
    const { ctx } = this;
    const now = new Date();
    const start = formatTime(0, 0, now.getHours());
    const end = formatTime(59, 59, now.getHours());
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
        status: 0,
      },
      include: ctx.model.User,
    });
    if (res) {
      for (const i of res) {
        const touser = i.user.openId;
        const template_id = i.templateId;
        const page = `/pages/index/detail?shareCode=${i.content.shareCode}`;
        const d = new Date(i.content.birthday);
        const name = i.content.name;
        const today = new Date();
        let solarBirthday = '';
        if (i.content.isLunar && d) {
          solarBirthday = lunarToSolar(
            today.getFullYear(),
            d.getMonth() + 1,
            d.getDate()
          );
        } else if (d) {
          solarBirthday = {
            year: today.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
          };
        }
        const distance = Math.floor(
          (new Date(
            solarBirthday.year,
            solarBirthday.month - 1,
            solarBirthday.day,
            23,
            59,
            59
          ).getTime() -
            new Date().getTime()) /
            (24 * 3600 * 1000)
        );
        const requestData = {
          touser,
          template_id,
          page,
          data: {
            time1: {
              value: `${solarBirthday.month}月${solarBirthday.day}日`,
            },
            thing3: {
              value: name,
            },
            thing2: {
              value: `距离他的(${i.content.isLunar ? '农历' : '公历'})生日还有${
                distance > 0 ? distance : 0
              }天`,
            },
          },
        };
        await this.send(requestData, i);
      }
    }
    return res;
  }
}

module.exports = WxService;
