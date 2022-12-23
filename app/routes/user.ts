export default function user(
  app: Egg.Application,
  jwt2auth: ReturnType<Egg.IMiddleware['jwt2auth']>,
  isAdmin: ReturnType<Egg.IMiddleware['isAdmin']>
) {
  const { router, controller } = app;
  const jwt: any = app.jwt;
  router.post('/api/user/use-password/login', controller.auth.loginByPassword);
  router.get('/api/user/create-token', controller.user.createToken);
  router.get('/api/user/wxapp-login-by-code', controller.user.wxappLoginBycode);
  router.get('/api/user/my-friends', controller.user.myfriends);
  router.get('/api/user/jwt/my-friends', jwt, controller.user.myfriendsByJwt);
  router.post(
    '/api/user/updateUserInfo',
    jwt,
    jwt2auth,
    controller.user.updateUserInfo
  );
  router.get(
    '/api/user/getSelfInfo',
    jwt,
    jwt2auth,
    controller.user.getSelfInfo
  );
  router.post('/api/user/jwt/create', jwt, controller.user.createByJwt);

  router.post(
    '/api/user/createByInvitation',
    jwt,
    jwt2auth,
    controller.user.createByInvitation
  );

  // -------------admin下面的user模块接口
  router.post(
    '/api/admin/user/list',
    jwt,
    jwt2auth,
    isAdmin,
    controller.admin.user.list
  );
}
