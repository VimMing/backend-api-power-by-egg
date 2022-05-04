/* eslint-disable strict */
const LocalStrategy = require('passport-local').Strategy;
module.exports = (app) => {
  // Mount strategy
  app.passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        // format user
        const user = {
          provider: 'local',
          username,
          password,
        };
        app.logger.info('%s %s get user: %j', req.method, req.url, user);
        app.passport.doVerify(req, user, done);
      }
    )
  );

  // Process user information
  app.passport.verify(async (ctx, user) => {
    app.logger.info('verify', user);
    const u = await ctx.service.user.validatorUser(user);
    if (u) {
      // ctx.logger.info('hello: ', await u.get());
      return await u.get();
    }
    ctx.logout();
    throw {
      message: '密码或手机错误',
      status: 401,
    };
  });
  app.passport.serializeUser(async (ctx, user) => {
    // app.logger.info('serializeUser', user);
    return user;
  });
  app.passport.deserializeUser(async (ctx, user) => {
    // app.logger.info('deserializeUser', user);
    // user = await ctx.model.User.findByPk(user.id);
    return user;
  });

  //   app.once('server', server => {
  //     // websocket
  //   });
  //   app.on('error', (err, ctx) => {
  //     // report error
  //   });
  //   app.on('request', ctx => {
  //     // log receive request
  //   });
  //   app.on('response', ctx => {
  //     // ctx.starttime is set by framework
  //     const used = Date.now() - ctx.starttime;
  //     // log total cost
  //     ctx.logger.info('hello', used);
  //   });
};
