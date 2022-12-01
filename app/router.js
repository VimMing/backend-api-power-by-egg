"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./routes/user");
const friends_1 = require("./routes/friends");
const movie_1 = require("./routes/movie");
const wxSubscription_1 = require("./routes/wxSubscription");
/**
 * @param {Egg.Application} app - egg application
 */
function default_1(app) {
    const { router, controller } = app;
    // const gzip = app.middleware.gzip({ threshold: 1024 });
    const jwt2auth = app.middleware.jwt2auth();
    const isAdmin = app.middleware.isAdmin();
    const jwt = app.jwt;
    // 用户相关
    (0, user_1.default)(app, jwt2auth, isAdmin);
    (0, friends_1.default)(app, jwt2auth, isAdmin);
    (0, movie_1.default)(app, jwt2auth, isAdmin);
    (0, wxSubscription_1.default)(app, jwt2auth, isAdmin);
    router.post('/api/wx/addBirthdayNotice', jwt, jwt2auth, controller.wx.addBirthdayNotice);
    router.get('/api/wx/sendBirthdayNotice', jwt, jwt2auth, controller.wx.sendBirthdayNotice);
    router.post('/api/wx/birthdayNotice/list', jwt, jwt2auth, controller.wx.list);
    router.post('/api/common/lunarToSolar', jwt, jwt2auth, controller.common.lunarToSolar);
    router.get('/api/user/getFriendByShareCode', controller.user.getFriendByShareCode);
    router.get('/api/user/deleteFriendByJwt', jwt, controller.user.destoryByJwt);
    router.get('/api/user/addFriendByOtherManShareByJwt', jwt, controller.user.addFriendByOtherManShareByJwt);
    router.get('/api/history/getWhatHappenedFromGivenDate', controller.history.getWhatHappenedFromGivenDate);
    router.get('/api/auth/create-token', controller.auth.createToken);
    router.get('/api/auth/oauth2', isAdmin, controller.auth.oauth2);
    router.post('/api/admin/user-list', isAdmin, controller.admin.user.list);
    router.get('/api/movie/one', controller.movie.getOne);
    router.get('/api/admin/movie/getTodayPic', isAdmin, controller.admin.movie.getTodayPic);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlDO0FBQ2pDLDhDQUF1QztBQUN2QywwQ0FBbUM7QUFDbkMsNERBQXFEO0FBQ3JEOztHQUVHO0FBQ0gsbUJBQXlCLEdBQW9CO0lBQzNDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ25DLHlEQUF5RDtJQUN6RCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekMsTUFBTSxHQUFHLEdBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUN6QixPQUFPO0lBQ1AsSUFBQSxjQUFJLEVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QixJQUFBLGlCQUFPLEVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQyxJQUFBLGVBQUssRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLElBQUEsd0JBQWMsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQ1QsMkJBQTJCLEVBQzNCLEdBQUcsRUFDSCxRQUFRLEVBQ1IsVUFBVSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FDaEMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxHQUFHLENBQ1IsNEJBQTRCLEVBQzVCLEdBQUcsRUFDSCxRQUFRLEVBQ1IsVUFBVSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FDakMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlFLE1BQU0sQ0FBQyxJQUFJLENBQ1QsMEJBQTBCLEVBQzFCLEdBQUcsRUFDSCxRQUFRLEVBQ1IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQy9CLENBQUM7SUFFRixNQUFNLENBQUMsR0FBRyxDQUNSLGdDQUFnQyxFQUNoQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUNyQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RSxNQUFNLENBQUMsR0FBRyxDQUNSLHlDQUF5QyxFQUN6QyxHQUFHLEVBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FDOUMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxHQUFHLENBQ1IsMkNBQTJDLEVBQzNDLFVBQVUsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQ2hELENBQUM7SUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV6RSxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FDUiw4QkFBOEIsRUFDOUIsT0FBTyxFQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDbkMsQ0FBQztBQUNKLENBQUM7QUExREQsNEJBMERDIn0=