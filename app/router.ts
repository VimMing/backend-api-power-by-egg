import user from './routes/user';
import friends from './routes/friends';
/**
 * @param {Egg.Application} app - egg application
 */
export default function (app: Egg.Application) {
  const { router, controller } = app;
  // const gzip = app.middleware.gzip({ threshold: 1024 });
  const jwt2auth = app.middleware.jwt2auth();
  const isAdmin = app.middleware.isAdmin();
  const jwt: any = app.jwt;
  // 用户相关
  user(app, jwt2auth, isAdmin);
  friends(app, jwt2auth, isAdmin);
  router.post(
    '/api/wx/addBirthdayNotice',
    jwt,
    jwt2auth,
    controller.wx.addBirthdayNotice
  );
  router.get(
    '/api/wx/sendBirthdayNotice',
    jwt,
    jwt2auth,
    controller.wx.sendBirthdayNotice
  );
  router.post('/api/wx/birthdayNotice/list', jwt, jwt2auth, controller.wx.list);

  router.post(
    '/api/common/lunarToSolar',
    jwt,
    jwt2auth,
    controller.common.lunarToSolar
  );

  router.get(
    '/api/user/getFriendByShareCode',
    controller.user.getFriendByShareCode
  );
  router.get('/api/user/deleteFriendByJwt', jwt, controller.user.destoryByJwt);
  router.get(
    '/api/user/addFriendByOtherManShareByJwt',
    jwt,
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
}
