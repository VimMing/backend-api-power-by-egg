/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  // const gzip = app.middleware.gzip({ threshold: 1024 });
  const jwt2auth = app.middleware.jwt2auth({ threshold: 1024 });
  const isAdmin = app.middleware.isAdmin({ threshold: 1024 });
  // 用户相关
  router.post(
    '/api/user/use-password/login',
    app.passport.authenticate('local', {
      successRedirect: '/api/auth/create-token',
    })
  );
  router.get('/api/user/create-token', controller.user.createToken);
  router.get('/api/user/wxapp-login-by-code', controller.user.wxappLoginBycode);
  router.get('/api/user/my-friends', controller.user.myfriends);
  router.get(
    '/api/user/jwt/my-friends',
    app.jwt,
    controller.user.myfriendsByJwt
  );
  router.post(
    '/api/user/updateUserInfo',
    app.jwt,
    jwt2auth,
    controller.user.updateUserInfo
  );
  router.post('/api/user/jwt/create', app.jwt, controller.user.createByJwt);

  router.post(
    '/api/wx/addBirthdayNotice',
    app.jwt,
    jwt2auth,
    controller.wx.addBirthdayNotice
  );
  router.get(
    '/api/wx/sendBirthdayNotice',
    app.jwt,
    jwt2auth,
    controller.wx.sendBirthdayNotice
  );
  router.post(
    '/api/wx/birthdayNotice/list',
    app.jwt,
    jwt2auth,
    controller.wx.list
  );

  router.post(
    '/api/common/lunarToSolar',
    app.jwt,
    jwt2auth,
    controller.common.lunarToSolar
  );

  router.get(
    '/api/user/getFriendByShareCode',
    controller.user.getFriendByShareCode
  );
  router.get(
    '/api/user/deleteFriendByJwt',
    app.jwt,
    controller.user.destoryByJwt
  );
  router.get(
    '/api/user/addFriendByOtherManShareByJwt',
    app.jwt,
    controller.user.addFriendByOtherManShareByJwt
  );
  router.get(
    '/api/history/getWhatHappenedFromGivenDate',
    controller.history.getWhatHappenedFromGivenDate
  );

  router.get('/api/auth/create-token', controller.auth.createToken);
  router.get('/api/auth/oauth2', isAdmin, controller.auth.oauth2);
  router.post('/api/admin/user-list', isAdmin, controller.admin.user.list);

  router.get('/api/movie/one', controller.movie.getOne);
  router.get(
    '/api/admin/movie/getTodayPic',
    isAdmin,
    controller.admin.movie.getTodayPic
  );
};
