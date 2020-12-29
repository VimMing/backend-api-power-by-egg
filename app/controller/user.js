'use strict';

const Controller = require('egg').Controller;
const LunarCalendar = require('lunar-calendar');
class UserController extends Controller {
  async createToken() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      const token = this.app.jwt.sign({
        ...ctx.user,
      }, this.app.config.jwt.secret, {
        expiresIn: '2h',
      });
      ctx.body = {
        data: 'Bearer ' + token,
        errcode: 0,
      };
    } else {
      ctx.throw(401, '没通过权限校验', { data: null });
    }
  }

  async create() {
    // 新增用户
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.validate({ name: 'string', birthday: 'date', isLunar: 'int' });
      const friend = await ctx.service.user.addFriend(ctx.request.body, ctx.user);
      ctx.body = friend;
    } else {
      ctx.throw(401, '权限校验失败', { data: null });
    }
  }

  async createByJwt() {
    await this.jwtToOauth();
    this.create();
  }

  async update() {
    console.log('hello world');
    // 验证是否是他的朋友
  }

  async wxappLoginBycode() {
    const { ctx, app } = this;
    const { key, secret } = app.config.passportWeapp;
    const code = ctx.query.code;
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const result = await ctx.curl(`${url}?appid=${key}&secret=${secret}&js_code=${code}&grant_type=authorization_code`);
    ctx.status = result.status;
    const data = JSON.parse(Buffer.from(result.data).toString());
    // ctx.logger.info(result);
    if (data.errcode) {
      ctx.body = data;
    } else {
      let user = await ctx.service.user.find({
        open_id: data.openid,
      });
      ctx.logger.info('user:', user, data.openid);
      if (!user) {
        user = await ctx.service.user.register({
          open_id: data.openid,
        });
      }
      await ctx.login(user);
      await this.createToken();
    }
  }
  async jwtToOauth() {
    const ctx = this.ctx;
    const user = ctx.state.user;
    await ctx.login(user);
  }
  async myfriendsByJwt() {
    await this.jwtToOauth();
    await this.myfriends();
  }
  async myfriends() {
    const ctx = this.ctx;
    if (ctx.isAuthenticated()) {
      const friends = await ctx.service.user.getMyFriends(ctx.user.id) || [];
      const data = friends.map(i => {
        const d = i.birthday;
        if (+i.is_lunar) {
          const today = new Date();
          i.solar_birthday = LunarCalendar.lunarToSolar(today.getFullYear(), d.getMonth() + 1, d.getDate());
          ctx.logger.info(typeof i.birthday.getFullYear());
        } else {
          i.solar_birthday = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        }
        return i;
      });
      ctx.body = {
        errcode: 0,
        data,
      };
    } else {
      ctx.throw(401, '权限校验失败', { data: null });
    }
  }
}

module.exports = UserController;
