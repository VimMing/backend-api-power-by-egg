const Controller = require('egg').Controller;

class AuthController extends Controller {
  async createToken() {
    const { ctx } = this;
    ctx.logger.info();
    if (ctx.isAuthenticated()) {
      const token = this.app.jwt.sign(
        {
          ...ctx.user,
        },
        this.app.config.jwt.secret,
        {
          expiresIn: '2h',
        }
      );
      ctx.body = {
        data: 'Bearer ' + token,
        errcode: 0,
      };
    } else {
      ctx.throw(401, '没通过权限校验', { data: null });
    }
  }

  async oauth2() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.body = {
        data: ctx.user,
        errcode: 0,
      };
    } else {
      ctx.throw(401, '没通过权限校验', { data: null });
    }
  }

  async loginByPassword() {
    const { ctx } = this;
    ctx.validate({ username: 'string', password: 'string' });
    const { username, password } = ctx.request.body;
    const userModel = await ctx.service.user.validatorUser({
      username,
      password,
    });
    if (userModel) {
      const user = userModel.get();
      await ctx.login(user);
      await this.createToken();
    } else {
      ctx.logout();
      ctx.throw(401, '密码或手机错误', { data: null });
    }
  }
}

module.exports = AuthController;
