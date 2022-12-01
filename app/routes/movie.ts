export default function movie(
  app: Egg.Application,
  jwt2auth: ReturnType<Egg.IMiddleware['jwt2auth']>,
  isAdmin: ReturnType<Egg.IMiddleware['isAdmin']>
) {
  const { router, controller } = app;
  const jwt: any = app.jwt;

  // -------------admin下面的movie模块接口
  router.post(
    '/api/admin/movie/list',
    jwt,
    jwt2auth,
    isAdmin,
    controller.admin.movie.list
  );
}
