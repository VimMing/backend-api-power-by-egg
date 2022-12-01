"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wxSubscription(app, jwt2auth, isAdmin) {
    const { router, controller } = app;
    const jwt = app.jwt;
    // -------------admin下面的wxSubscription模块接口
    router.post('/api/admin/wxSubscription/list', jwt, jwt2auth, isAdmin, controller.admin.wxSubscription.list);
}
exports.default = wxSubscription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hTdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eFN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQXdCLGNBQWMsQ0FDcEMsR0FBb0IsRUFDcEIsUUFBaUQsRUFDakQsT0FBK0M7SUFFL0MsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbkMsTUFBTSxHQUFHLEdBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUV6QiwwQ0FBMEM7SUFDMUMsTUFBTSxDQUFDLElBQUksQ0FDVCxnQ0FBZ0MsRUFDaEMsR0FBRyxFQUNILFFBQVEsRUFDUixPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNyQyxDQUFDO0FBQ0osQ0FBQztBQWhCRCxpQ0FnQkMifQ==