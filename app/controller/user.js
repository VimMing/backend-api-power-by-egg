'use strict';

const Controller = require('egg').Controller;
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
      ctx.body = await ctx.service.user.getMyFriends(ctx.user.id);
    } else {
      ctx.throw(401, '权限校验失败', { data: null });
    }
  }
}

module.exports = UserController;
