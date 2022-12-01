"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Controller = require('egg').Controller;
const egg_1 = require("egg");
const utils_1 = require("../utils");
class BaseController extends egg_1.Controller {
    async list() {
        const ctx = this.ctx;
        const { page = 1, limit = 20, __searchForm = [] } = ctx.request.body;
        const list = await ctx.model[this.modelName].findAll({
            where: (0, utils_1.getWhereClauses)(__searchForm),
            limit,
            offset: (page - 1) * limit,
        });
        const amount = await ctx.model[this.modelName].count({
            where: (0, utils_1.getWhereClauses)(__searchForm),
        });
        ctx.body = { data: { list, amount, page }, errCode: 0 };
    }
}
exports.default = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBZ0Q7QUFDaEQsNkJBQWtEO0FBQ2xELG9DQUEyQztBQUMzQyxNQUFlLGNBQWUsU0FBUSxnQkFBVTtJQVE5QyxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxZQUFZLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDckUsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkQsS0FBSyxFQUFFLElBQUEsdUJBQWUsRUFBQyxZQUFZLENBQUM7WUFDcEMsS0FBSztZQUNMLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLO1NBQzNCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ25ELEtBQUssRUFBRSxJQUFBLHVCQUFlLEVBQUMsWUFBWSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==