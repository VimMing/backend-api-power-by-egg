"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class WxSubscriptionController extends base_1.default {
    constructor() {
        super(...arguments);
        this.modelName = 'WxSubscription';
    }
    async destory() {
        const ctx = this.ctx;
        const id = ctx.query.id;
        if (!id) {
            throw {
                message: 'id参数缺失',
                status: 400,
            };
        }
        const notice = await ctx.model.WxSubscription.findOne({
            where: {
                id,
                userId: ctx.user.id,
            },
        });
        if (notice) {
            await notice.destroy();
            ctx.body = {
                errCode: 0,
            };
        }
        else {
            ctx.throw('数据不存在', 400);
        }
        ctx.body = { errCode: 0 };
    }
}
exports.default = WxSubscriptionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hTdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eFN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFvQztBQUNwQyxNQUFNLHdCQUF5QixTQUFRLGNBQWM7SUFBckQ7O1FBQ0UsY0FBUyxHQUFHLGdCQUFnQixDQUFDO0lBMEIvQixDQUFDO0lBekJDLEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsTUFBTTtnQkFDSixPQUFPLEVBQUUsUUFBUTtnQkFDakIsTUFBTSxFQUFFLEdBQUc7YUFDWixDQUFDO1NBQ0g7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUNwRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRTtnQkFDRixNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNIO2FBQU07WUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBRUQsa0JBQWUsd0JBQXdCLENBQUMifQ==