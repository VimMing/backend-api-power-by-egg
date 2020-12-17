'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户相关
  router.get('/', controller.user.index);
  router.post('/api/user/use-password/login', app.passport.authenticate('local', { successRedirect: '/api/user/create-token' }));
  router.get('/api/user/create-token', controller.user.createToken);
  router.get('/api/user/my-friends', controller.user.myfriends);
  router.resources('user', '/api/user', controller.user);
};
