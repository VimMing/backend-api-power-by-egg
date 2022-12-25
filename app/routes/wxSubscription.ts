export default function wxSubscription(
  app: Egg.Application,
  jwt2auth: ReturnType<Egg.IMiddleware['jwt2auth']>,
  isAdmin: ReturnType<Egg.IMiddleware['isAdmin']>
) {
  const { router, controller } = app;
  const jwt: any = app.jwt;

  router.get(
    '/api/wxSubscription/destory',
    jwt,
    jwt2auth,
    controller.wxSubscription.destory
  );

  // -------------admin下面的wxSubscription模块接口
  router.post(
    '/api/admin/wxSubscription/list',
    jwt,
    jwt2auth,
    isAdmin,
    controller.admin.wxSubscription.list
  );
}
