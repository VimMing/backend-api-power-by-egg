'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户相关
  router.post('/api/user/use-password/login', app.passport.authenticate('local', { successRedirect: '/api/user/create-token' }));
  router.get('/api/user/create-token', controller.user.createToken);
  router.get('/api/user/wxapp-login-by-code', controller.user.wxappLoginBycode);
  router.get('/api/user/my-friends', controller.user.myfriends);
  router.get('/api/user/jwt/my-friends', app.jwt, controller.user.myfriendsByJwt);
  router.post('/api/user/jwt/create', app.jwt, controller.user.createByJwt);
  router.get('/api/user/show', controller.user.show);
  router.get('/api/history/baike', controller.history.baike);
};
