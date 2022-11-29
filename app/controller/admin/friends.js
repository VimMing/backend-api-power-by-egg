"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const utils_1 = require("../../utils");
class FriendsController extends base_1.default {
    async list() {
        const ctx = this.ctx;
        const { page = 1, limit = 20, __searchForm = [] } = ctx.request.body;
        const list = await ctx.model.MyFriend.findAll({
            where: (0, utils_1.getWhereClauses)(__searchForm),
            limit,
            offset: (page - 1) * limit,
        });
        const amount = await ctx.model.MyFriend.count({
            where: (0, utils_1.getWhereClauses)(__searchForm),
        });
        ctx.body = { data: { list, amount, page }, errCode: 0 };
    }
}
exports.default = FriendsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBcUM7QUFDckMsdUNBQThDO0FBQzlDLE1BQU0saUJBQWtCLFNBQVEsY0FBYztJQUM1QyxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxZQUFZLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDckUsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDNUMsS0FBSyxFQUFFLElBQUEsdUJBQWUsRUFBQyxZQUFZLENBQUM7WUFDcEMsS0FBSztZQUNMLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLO1NBQzNCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzVDLEtBQUssRUFBRSxJQUFBLHVCQUFlLEVBQUMsWUFBWSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9