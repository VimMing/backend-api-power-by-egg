"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const utils_1 = require("../utils");
const base_1 = require("./base");
class UserController extends base_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFDaEMsb0NBQXdDO0FBQ3hDLGlDQUFvQztBQUNwQyxNQUFNLGNBQWUsU0FBUSxjQUFjO0lBQTNDOztRQUNFLGNBQVMsR0FBRyxNQUFNLENBQUM7SUE0U3JCLENBQUM7SUEzU0MsS0FBSyxDQUFDLFdBQVc7UUFDZixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksbUJBRXhCLEdBQUcsQ0FBQyxJQUFJLEdBRWIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDMUI7Z0JBQ0UsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FDRixDQUFDO1lBQ0YsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDVCxJQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUs7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNIO2FBQU07WUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLE1BQU07Z0JBQ0osT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztTQUNIO1FBQ0QsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEVB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