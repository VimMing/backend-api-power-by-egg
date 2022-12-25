"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wxSubscription(app, jwt2auth, isAdmin) {
    const { router, controller } = app;
    const jwt = app.jwt;
    router.get('/api/wxSubscription/destory', jwt, jwt2auth, controller.wxSubscription.destory);
    // -------------admin下面的wxSubscription模块接口
    router.post('/api/admin/wxSubscription/list', jwt, jwt2auth, isAdmin, controller.admin.wxSubscription.list);
}
exports.default = wxSubscription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hTdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eFN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQXdCLGNBQWMsQ0FDcEMsR0FBb0IsRUFDcEIsUUFBaUQsRUFDakQsT0FBK0M7SUFFL0MsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbkMsTUFBTSxHQUFHLEdBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUV6QixNQUFNLENBQUMsR0FBRyxDQUNSLDZCQUE2QixFQUM3QixHQUFHLEVBQ0gsUUFBUSxFQUNSLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUNsQyxDQUFDO0lBRUYsMENBQTBDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQ1QsZ0NBQWdDLEVBQ2hDLEdBQUcsRUFDSCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDckMsQ0FBQztBQUNKLENBQUM7QUF2QkQsaUNBdUJDIn0=