"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const utils_1 = require("../utils");
const base_1 = require("./base");
class UserController extends base_1.default {
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
    async destory() {
        const { ctx } = this;
        const id = ctx.query.id;
        if (!id) {
            throw {
                message: 'id参数缺失',
                status: 400,
            };
        }
        if (ctx.isAuthenticated()) {
            const friend = await ctx.model.MyFriend.findOne({
                where: {
                    id,
                    userId: ctx.user.id,
                },
            });
            if (friend) {
                await friend.destroy();
                ctx.body = {
                    errCode: 0,
                };
                ctx.status = 200;
            }
            else {
                ctx.throw({
                    status: 400,
                    message: '生日不存在，请确认',
                });
            }
        }
        else {
            ctx.throw({
                status: 401,
                message: '权限校验失败',
            });
        }
    }
    // /user/updateUserInfo
    async updateUserInfo() {
        const { ctx } = this;
        ctx.validate({ avatarUrl: 'string', nickName: 'string' });
        const user = await ctx.model.User.findByPk(ctx.user.id);
        const { nickName, avatarUrl } = ctx.request.body;
        if (user) {
            await user.update({
                nickname: nickName,
                avatarUrl,
            });
            ctx.body = {
                errCode: 0,
            };
        }
        else {
            ctx.body = {
                errCode: 1,
            };
        }
    }
    async create() {
        // 新增用户
        const { ctx } = this;
        if (ctx.isAuthenticated()) {
            ctx.validate({
                name: 'string',
                birthday: 'date',
                isLunar: 'boolean',
                zodiac: 'int',
            });
            const { id, name, birthday, isLunar, zodiac } = ctx.request.body;
            let friend = {};
            if (id) {
                friend = await ctx.model.MyFriend.findByPk(parseInt(id));
                if (friend && friend.userId === ctx.user.id) {
                    await friend.update({ name, birthday, isLunar, zodiac });
                }
                else {
                    ctx.body = {
                        errCode: 1,
                        errMsg: 'id有误',
                    };
                }
            }
            else {
                friend = await ctx.model.MyFriend.create({
                    name,
                    birthday,
                    isLunar,
                    zodiac,
                    userId: ctx.user.id,
                });
            }
            ctx.body = friend;
        }
        else {
            ctx.throw(401, '权限校验失败', { data: null });
        }
    }
    async createByJwt() {
        await this.jwtToOauth();
        await this.create();
    }
    async destoryByJwt() {
        await this.jwtToOauth();
        await this.destory();
    }
    async update() {
        console.log('hello world');
        // 验证是否是他的朋友
    }
    async getFriendByShareCode() {
        const ctx = this.ctx;
        const friend = await ctx.model.MyFriend.findOne({
            where: {
                shareCode: ctx.query.shareCode,
            },
        });
        let i = null;
        if (friend) {
            i = friend.get();
            const d = i.birthday;
            const today = new Date();
            if (i.isLunar) {
                i.solarBirthday = (0, utils_1.lunarToSolar)(today.getFullYear(), d.getMonth() + 1, d.getDate());
                // ctx.logger.info(typeof i.birthday.getFullYear());
            }
            else {
                i.solarBirthday = {
                    year: today.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate(),
                };
            }
        }
        ctx.body = {
            data: i || friend,
            errCode: 0,
        };
    }
    async addFriendByOtherManShareByJwt() {
        await this.jwtToOauth();
        await this.addFriendByOtherManShare();
    }
    async addFriendByOtherManShare() {
        const id = this.ctx.query.id;
        const ctx = this.ctx;
        if (!id) {
            ctx.body = {
                errCode: 1,
                errMsg: 'id参数缺失',
            };
            throw {
                message: 'id参数缺失',
                status: 200,
            };
        }
        if (ctx.isAuthenticated()) {
            const friendModel = await ctx.model.MyFriend.findByPk(id);
            if (!friendModel) {
                throw {
                    message: '记录不存在',
                    status: 200,
                };
            }
            const friend = friendModel.get();
            if (friend && +friend.userId !== +ctx.user.id) {
                const res = await ctx.model.MyFriend.create({
                    name: friend.name,
                    userId: ctx.user.id,
                    birthday: friend.birthday,
                    isLunar: friend.isLunar,
                    zodiac: friend.zodiac,
                    shareCode: (0, nanoid_1.nanoid)(),
                });
                ctx.body = {
                    data: res,
                    errCode: 0,
                };
            }
            else {
                ctx.body = {
                    errCode: 1,
                    errMsg: '她/他已经是你的朋友了',
                };
            }
        }
        else {
            ctx.status = 401;
            ctx.body = {
                errCode: 1,
                errMsg: '权限校验失败',
            };
        }
    }
    async wxappLoginBycode() {
        const { ctx, app } = this;
        const { key, secret } = app.config.passportWeapp;
        const code = ctx.query.code;
        const url = 'https://api.weixin.qq.com/sns/jscode2session';
        const result = await ctx.curl(`${url}?appid=${key}&secret=${secret}&js_code=${code}&grant_type=authorization_code`);
        ctx.status = result.status;
        const data = JSON.parse(Buffer.from(result.data).toString());
        if (data.errCode) {
            ctx.body = data;
        }
        else {
            let user = await ctx.model.User.findOne({
                where: {
                    openId: data.openid,
                },
            });
            if (!user) {
                user = await ctx.model.User.create({ openId: data.openid });
                // ctx.logger.info('user:', user, data.openid);
            }
            await ctx.login(user.get());
            await this.createToken();
        }
    }
    async jwtToOauth() {
        const ctx = this.ctx;
        const user = ctx.state.user;
        await ctx.login(user);
    }
    async myfriendsByJwt() {
        await this.jwtToOauth();
        await this.myfriends();
    }
    async myfriends() {
        const ctx = this.ctx;
        if (ctx.isAuthenticated()) {
            // ctx.logger.info('user: hello world', ctx.user);
            // const friends = await ctx.service.user.getMyFriends(ctx.user.id) || [];
            const friends = await ctx.model.MyFriend.findAll({
                where: {
                    userId: ctx.user.id,
                },
            });
            let data = [];
            // ctx.logger.info('user: hello world', friends);
            if (friends) {
                // ctx.logger.info(friends);
                data = friends.map((i) => {
                    if (!i.shareCode) {
                        i.update({
                            shareCode: (0, nanoid_1.nanoid)(),
                        });
                    }
                    i = i.get();
                    const d = i.birthday;
                    const today = new Date();
                    if (i.isLunar) {
                        i.solarBirthday = (0, utils_1.lunarToSolar)(today.getFullYear(), d.getMonth() + 1, d.getDate());
                    }
                    else {
                        i.solarBirthday = {
                            year: today.getFullYear(),
                            month: d.getMonth() + 1,
                            day: d.getDate(),
                        };
                    }
                    return i;
                });
            }
            ctx.body = {
                errCode: 0,
                data,
            };
        }
        else {
            ctx.throw(401, '权限校验失败', { data: null });
        }
    }
}
module.exports = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFDaEMsb0NBQXdDO0FBQ3hDLGlDQUFvQztBQUNwQyxNQUFNLGNBQWUsU0FBUSxjQUFjO0lBQ3pDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLG1CQUV4QixHQUFHLENBQUMsSUFBSSxHQUViLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQzFCO2dCQUNFLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQ0YsQ0FBQztZQUNGLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLFNBQVMsR0FBRyxLQUFLO2dCQUN2QixPQUFPLEVBQUUsQ0FBQzthQUNYLENBQUM7U0FDSDthQUFNO1lBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxNQUFNO2dCQUNKLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixNQUFNLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDSDtRQUNELElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUss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