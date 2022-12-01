"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class MovieController extends base_1.default {
    constructor() {
        super(...arguments);
        this.modelName = 'Movie';
    }
    async getTodayPic() {
        const ctx = this.ctx;
        await this.service.movie.getTodayPic();
        ctx.body = { errCode: 0 };
    }
}
exports.default = MovieController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92aWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb3ZpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFxQztBQUNyQyxNQUFNLGVBQWdCLFNBQVEsY0FBYztJQUE1Qzs7UUFDRSxjQUFTLEdBQUcsT0FBTyxDQUFDO0lBTXRCLENBQUM7SUFMQyxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELGtCQUFlLGVBQWUsQ0FBQyJ9