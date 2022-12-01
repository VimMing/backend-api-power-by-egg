"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class WxSubscriptionController extends base_1.default {
    constructor() {
        super(...arguments);
        this.modelName = 'WxSubscription';
    }
    async getTodayPic() {
        const ctx = this.ctx;
        await this.service.movie.getTodayPic();
        ctx.body = { errCode: 0 };
    }
}
exports.default = WxSubscriptionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hTdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eFN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFxQztBQUNyQyxNQUFNLHdCQUF5QixTQUFRLGNBQWM7SUFBckQ7O1FBQ0UsY0FBUyxHQUFHLGdCQUFnQixDQUFDO0lBTS9CLENBQUM7SUFMQyxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELGtCQUFlLHdCQUF3QixDQUFDIn0=