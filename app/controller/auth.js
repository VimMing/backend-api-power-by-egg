const Controller = require('egg').Controller;

class AuthController extends Controller {
  async createToken() {
    const { ctx } = this;
    ctx.logger.info();
    if (ctx.isAuthenticated()) {
      ctx.logger.info(ctx.user);
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
}

module.exports = AuthController;
