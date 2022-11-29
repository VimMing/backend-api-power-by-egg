"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function friends(app, jwt2auth, isAdmin) {
    const { router, controller } = app;
    const jwt = app.jwt;
    // -------------admin下面的friends模块接口
    router.post('/api/admin/friends/list', jwt, jwt2auth, isAdmin, controller.admin.friends.list);
}
exports.default = friends;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixPQUFPLENBQzdCLEdBQW9CLEVBQ3BCLFFBQWlELEVBQ2pELE9BQStDO0lBRS9DLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ25DLE1BQU0sR0FBRyxHQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFFekIsbUNBQW1DO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQ1QseUJBQXlCLEVBQ3pCLEdBQUcsRUFDSCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDOUIsQ0FBQztBQUNKLENBQUM7QUFoQkQsMEJBZ0JDIn0=