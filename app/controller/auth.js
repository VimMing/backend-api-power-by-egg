"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class AuthController extends base_1.default {
    constructor() {
        super(...arguments);
        this.modelName = 'User';
    }
    async createToken() {
        const { ctx } = this;
        if (ctx.isAuthenticated()) {
            const token = this.app.jwt.sign(Object.assign({}, ctx.user), this.app.config.jwt.secret, {
                expiresIn: '2h',
            });
            ctx.body = {
                data: 'Bearer ' + token,
                errCode: 0,
            };
        }
        else {
            ctx.throw(401, '没通过权限校验', { data: null });
        }
    }
    async oauth2() {
        const { ctx } = this;
        if (ctx.isAuthenticated()) {
            ctx.body = {
                data: ctx.user,
                errCode: 0,
            };
        }
        else {
            ctx.throw(401, '没通过权限校验', { data: null });
        }
    }
    async loginByPassword() {
        const { ctx } = this;
        ctx.validate({ username: 'string', password: 'string' });
        const { username, password } = ctx.request.body;
        const userModel = await ctx.service.user.validatorUser({
            username,
            password,
        });
        if (userModel) {
            const user = userModel.get();
            await ctx.login(user);
            await this.createToken();
        }
        else {
            ctx.logout();
            ctx.throw(401, '密码或手机错误', { data: null });
        }
    }
}
module.exports = AuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBb0M7QUFFcEMsTUFBTSxjQUFlLFNBQVEsY0FBYztJQUEzQzs7UUFDRSxjQUFTLEdBQUcsTUFBTSxDQUFDO0lBbURyQixDQUFDO0lBbERDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLG1CQUV4QixHQUFHLENBQUMsSUFBSSxHQUViLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQzFCO2dCQUNFLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQ0YsQ0FBQztZQUNGLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLFNBQVMsR0FBRyxLQUFLO2dCQUN2QixPQUFPLEVBQUUsQ0FBQzthQUNYLENBQUM7U0FDSDthQUFNO1lBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNIO2FBQU07WUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZTtRQUNuQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDaEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDckQsUUFBUTtZQUNSLFFBQVE7U0FDVCxDQUFDLENBQUM7UUFDSCxJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMifQ==