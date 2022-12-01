"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class UserController extends base_1.default {
    constructor() {
        super(...arguments);
        this.modelName = 'User';
    }
    async list() {
        const ctx = this.ctx;
        const { list, amount, page } = await this.service.user.list(ctx.request.body);
        ctx.body = { data: { list, amount, page }, errCode: 0 };
    }
    async test() {
        const ctx = this.ctx;
        console.log(ctx);
        ctx.body = { errCode: 0 };
    }
}
exports.default = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBcUM7QUFFckMsTUFBTSxjQUFlLFNBQVEsY0FBYztJQUEzQzs7UUFDRSxjQUFTLEdBQUcsTUFBTSxDQUFDO0lBYXJCLENBQUM7SUFaQyxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3pELEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNqQixDQUFDO1FBQ0YsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELGtCQUFlLGNBQWMsQ0FBQyJ9