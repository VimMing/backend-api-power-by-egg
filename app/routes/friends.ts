export default function friends(
  app: Egg.Application,
  jwt2auth: ReturnType<Egg.IMiddleware['jwt2auth']>,
  isAdmin: ReturnType<Egg.IMiddleware['isAdmin']>
) {
  const { router, controller } = app;
  const jwt: any = app.jwt;

  // -------------admin下面的friends模块接口
  router.post(
    '/api/admin/friends/list',
    jwt,
    jwt2auth,
    isAdmin,
    controller.admin.friends.list
  );
}
