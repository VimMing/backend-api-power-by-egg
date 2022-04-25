"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Controller = require('egg').Controller;
const egg_1 = require("egg");
class BaseController extends egg_1.Controller {
    async test() {
        const { ctx } = this;
        ctx.model.test.findOne();
    }
}
exports.default = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBZ0Q7QUFDaEQsNkJBQTBDO0FBQzFDLE1BQU0sY0FBZSxTQUFRLGdCQUFVO0lBTXJDLEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==