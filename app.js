/* eslint-disable strict */
const LocalStrategy = require('passport-local').Strategy;
module.exports = app => {
  // Mount strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.logger.info('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // Process user information
  app.passport.verify(async (ctx, user) => {
    app.logger.info('verify', user);
    return user;
  });
  app.passport.serializeUser(async (ctx, user) => {
    app.logger.info('serializeUser', user);
    return await ctx.service.user.find(1);
  });
  app.passport.deserializeUser(async (ctx, user) => {
    app.logger.info('deserializeUser', user);
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
