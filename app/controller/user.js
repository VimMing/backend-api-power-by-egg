'use strict';

const Controller = require('egg').Controller;
const LunarCalendar = require('lunar-calendar');
class UserController extends Controller {
  async index() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      // show user info
      ctx.logger.info('xxxxxx');
      this.ctx.body = this.ctx.state.user;
    } else {
      this.ctx.body = this.ctx.state.user;
    }
  }
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
        code: 0,
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

  async show() {
    // 新增用户
    this.ctx.body = this.ctx.state.user;
  }

  async edit() {
    console.log('hello world');
  }

  async update() {
    console.log('hello world');
  }

  async destroy() {
    console.log('hello world');
  }
  async myfriends() {
    const ctx = this.ctx;
    if (ctx.isAuthenticated()) {
      const friends = await ctx.service.user.getMyFriends(ctx.user.id) || [];
      ctx.body = friends.map(i => {
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
    } else {
      ctx.throw(401, '权限校验失败', { data: null });
    }
  }
}

module.exports = UserController;
