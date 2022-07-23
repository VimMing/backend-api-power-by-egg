"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./routes/user");
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
    user_1.default(app, jwt2auth, isAdmin);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlDO0FBQ2pDOztHQUVHO0FBQ0gsbUJBQXlCLEdBQW9CO0lBQzNDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ25DLHlEQUF5RDtJQUN6RCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekMsTUFBTSxHQUFHLEdBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUN6QixPQUFPO0lBQ1AsY0FBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0IsTUFBTSxDQUFDLElBQUksQ0FDVCwyQkFBMkIsRUFDM0IsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUNoQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FDUiw0QkFBNEIsRUFDNUIsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUNqQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUUsTUFBTSxDQUFDLElBQUksQ0FDVCwwQkFBMEIsRUFDMUIsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDL0IsQ0FBQztJQUVGLE1BQU0sQ0FBQyxHQUFHLENBQ1IsZ0NBQWdDLEVBQ2hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQ3JDLENBQUM7SUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQ1IseUNBQXlDLEVBQ3pDLEdBQUcsRUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUM5QyxDQUFDO0lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FDUiwyQ0FBMkMsRUFDM0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FDaEQsQ0FBQztJQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpFLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsR0FBRyxDQUNSLDhCQUE4QixFQUM5QixPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUNuQyxDQUFDO0FBQ0osQ0FBQztBQXRERCw0QkFzREMifQ==