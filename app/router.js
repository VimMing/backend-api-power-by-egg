"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./routes/user");
const friends_1 = require("./routes/friends");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlDO0FBQ2pDLDhDQUF1QztBQUN2Qzs7R0FFRztBQUNILG1CQUF5QixHQUFvQjtJQUMzQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNuQyx5REFBeUQ7SUFDekQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLE1BQU0sR0FBRyxHQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDekIsT0FBTztJQUNQLElBQUEsY0FBSSxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0IsSUFBQSxpQkFBTyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLElBQUksQ0FDVCwyQkFBMkIsRUFDM0IsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUNoQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FDUiw0QkFBNEIsRUFDNUIsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUNqQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUUsTUFBTSxDQUFDLElBQUksQ0FDVCwwQkFBMEIsRUFDMUIsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDL0IsQ0FBQztJQUVGLE1BQU0sQ0FBQyxHQUFHLENBQ1IsZ0NBQWdDLEVBQ2hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQ3JDLENBQUM7SUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQ1IseUNBQXlDLEVBQ3pDLEdBQUcsRUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUM5QyxDQUFDO0lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FDUiwyQ0FBMkMsRUFDM0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FDaEQsQ0FBQztJQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpFLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsR0FBRyxDQUNSLDhCQUE4QixFQUM5QixPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUNuQyxDQUFDO0FBQ0osQ0FBQztBQXZERCw0QkF1REMifQ==