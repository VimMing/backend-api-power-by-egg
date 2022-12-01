"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function movie(app, jwt2auth, isAdmin) {
    const { router, controller } = app;
    const jwt = app.jwt;
    // -------------admin下面的movie模块接口
    router.post('/api/admin/movie/list', jwt, jwt2auth, isAdmin, controller.admin.movie.list);
}
exports.default = movie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92aWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb3ZpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQXdCLEtBQUssQ0FDM0IsR0FBb0IsRUFDcEIsUUFBaUQsRUFDakQsT0FBK0M7SUFFL0MsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbkMsTUFBTSxHQUFHLEdBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUV6QixpQ0FBaUM7SUFDakMsTUFBTSxDQUFDLElBQUksQ0FDVCx1QkFBdUIsRUFDdkIsR0FBRyxFQUNILFFBQVEsRUFDUixPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUM1QixDQUFDO0FBQ0osQ0FBQztBQWhCRCx3QkFnQkMifQ==