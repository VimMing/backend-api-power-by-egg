"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require('egg').Controller;
const utils_1 = require("../utils");
class CommonController extends Controller {
    async lunarToSolar() {
        const { ctx } = this;
        ctx.validate({ year: 'int', month: 'int', day: 'int' });
        const body = ctx.request.body;
        ctx.body = {
            errCode: 0,
            data: utils_1.lunarToSolar(body.year, body.month, body.day),
        };
    }
}
module.exports = CommonController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUM3QyxvQ0FBd0M7QUFDeEMsTUFBTSxnQkFBaUIsU0FBUSxVQUFVO0lBQ3ZDLEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN4RCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM5QixHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1QsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsb0JBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNwRCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyJ9