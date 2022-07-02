export function user(
  app: Egg.Application,
  jwt2auth: Egg.IMiddleware['jwt2auth']
) {
  const { router, controller } = app;
  router.post('/api/user/use-password/login', controller.auth.loginByPassword);
  router.get('/api/user/create-token', controller.user.createToken);
  router.get('/api/user/wxapp-login-by-code', controller.user.wxappLoginBycode);
  router.get('/api/user/my-friends', controller.user.myfriends);
  router.get(
    '/api/user/jwt/my-friends',
    app.jwt as any,
    controller.user.myfriendsByJwt
  );
  router.post(
    '/api/user/updateUserInfo',
    app.jwt as any,
    jwt2auth,
    controller.user.updateUserInfo
  );
  router.post(
    '/api/user/jwt/create',
    app.jwt as any,
    controller.user.createByJwt
  );
}
