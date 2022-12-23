"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function user(app, jwt2auth, isAdmin) {
    const { router, controller } = app;
    const jwt = app.jwt;
    router.post('/api/user/use-password/login', controller.auth.loginByPassword);
    router.get('/api/user/create-token', controller.user.createToken);
    router.get('/api/user/wxapp-login-by-code', controller.user.wxappLoginBycode);
    router.get('/api/user/my-friends', controller.user.myfriends);
    router.get('/api/user/jwt/my-friends', jwt, controller.user.myfriendsByJwt);
    router.post('/api/user/updateUserInfo', jwt, jwt2auth, controller.user.updateUserInfo);
    router.get('/api/user/getSelfInfo', jwt, jwt2auth, controller.user.getSelfInfo);
    router.post('/api/user/jwt/create', jwt, controller.user.createByJwt);
    router.post('/api/user/createByInvitation', jwt, jwt2auth, controller.user.createByInvitation);
    // -------------admin下面的user模块接口
    router.post('/api/admin/user/list', jwt, jwt2auth, isAdmin, controller.admin.user.list);
}
exports.default = user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixJQUFJLENBQzFCLEdBQW9CLEVBQ3BCLFFBQWlELEVBQ2pELE9BQStDO0lBRS9DLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ25DLE1BQU0sR0FBRyxHQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1RSxNQUFNLENBQUMsSUFBSSxDQUNULDBCQUEwQixFQUMxQixHQUFHLEVBQ0gsUUFBUSxFQUNSLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUMvQixDQUFDO0lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FDUix1QkFBdUIsRUFDdkIsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDNUIsQ0FBQztJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEUsTUFBTSxDQUFDLElBQUksQ0FDVCw4QkFBOEIsRUFDOUIsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUNuQyxDQUFDO0lBRUYsZ0NBQWdDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQ1Qsc0JBQXNCLEVBQ3RCLEdBQUcsRUFDSCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDM0IsQ0FBQztBQUNKLENBQUM7QUF6Q0QsdUJBeUNDIn0=