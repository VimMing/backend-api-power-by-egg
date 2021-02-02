'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const gzip = app.middleware.gzip({ threshold: 1024 });
  const jwt2auth = app.middleware.jwt2auth({ threshold: 1024 });
  // 用户相关
  router.post('/api/user/use-password/login', app.passport.authenticate('local', { successRedirect: '/api/user/create-token' }));
  router.get('/api/user/create-token', controller.user.createToken);
  router.get('/api/user/wxapp-login-by-code', controller.user.wxappLoginBycode);
  router.get('/api/user/my-friends', controller.user.myfriends);
  router.get('/api/user/jwt/my-friends', app.jwt, controller.user.myfriendsByJwt);
  router.post('/api/user/jwt/create', app.jwt, controller.user.createByJwt);
  router.post('/api/wx/addBirthdayNotice', app.jwt, jwt2auth, controller.wx.addBirthdayNotice);
  router.get('/api/user/test', app.jwt, jwt2auth, controller.wx.test);
  router.get('/api/user/getFriendByShareCode', controller.user.getFriendByShareCode);
  router.get('/api/user/deleteFriendByJwt', app.jwt, controller.user.destoryByJwt);
  router.get('/api/user/addFriendByOtherManShareByJwt', app.jwt, controller.user.addFriendByOtherManShareByJwt);
  // router.get('/api/history/baike', controller.history.baike);
  router.get('/api/history/getWhatHappenedFromGivenDate', controller.history.getWhatHappenedFromGivenDate);
};
