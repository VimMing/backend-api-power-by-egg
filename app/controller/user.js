"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require('egg').Controller;
// const LunarCalendar = require('lunar-calendar');
// const nanoid = require('nanoid');
const nanoid_1 = require("nanoid");
// import LunarCalendar from 'lunar-calendar';
const utils_1 = require("../utils");
class UserController extends Controller {
    async createToken() {
        const { ctx } = this;
        if (ctx.isAuthenticated()) {
            const token = this.app.jwt.sign(Object.assign({}, ctx.user), this.app.config.jwt.secret, {
                expiresIn: '2h',
            });
            ctx.body = {
                data: 'Bearer ' + token,
                errcode: 0,
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
                // friend = await ctx.model.MyFriend.create({ });
                friend = await ctx.model.MyFriend.findByPk(parseInt(id));
                if (friend && friend.userId === ctx.user.id) {
                    await friend.update({ name, birthday, isLunar, zodiac });
                }
                else {
                    ctx.body = {
                        errcode: 1,
                        errMessage: 'id有误',
                    };
                }
            }
            else {
                // ctx.logger.info('user:', ctx.user);
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
                i.solarBirthday = utils_1.lunarToSolar(today.getFullYear(), d.getMonth() + 1, d.getDate());
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
            errcode: 0,
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
                code: 1,
                errMessage: 'id参数缺失',
            };
            throw {
                message: 'id参数缺失',
                status: 200,
            };
        }
        if (ctx.isAuthenticated()) {
            const friend = await ctx.model.MyFriend.findByPk(id);
            // ctx.logger.info('friend', friend);
            if (!friend) {
                throw {
                    message: '记录不存在',
                    status: 200,
                };
            }
            if (friend && +friend.userId !== +ctx.user.id) {
                const res = await ctx.model.MyFriend.create({
                    name: friend.name,
                    userId: ctx.user.id,
                    birthday: friend.birthday,
                    isLunar: friend.isLunar,
                    zodiac: friend.zodiac,
                    shareCode: nanoid_1.nanoid(),
                });
                ctx.body = {
                    data: res,
                    errcode: 0,
                };
            }
            else {
                ctx.body = {
                    errcode: 1,
                    errMessage: '她/他已经是你的朋友了',
                };
            }
        }
        else {
            ctx.status = 401;
            ctx.body = {
                code: 1,
                errMessage: '权限校验失败',
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
        // ctx.logger.info(result);
        if (data.errcode) {
            ctx.body = data;
        }
        else {
            // let user = await ctx.service.user.find({
            //   open_id: data.openid,
            // });
            let user = await ctx.model.User.findOne({
                where: {
                    openId: data.openid,
                },
            });
            // ctx.logger.info('user:', user);
            if (!user) {
                // user = await ctx.service.user.register({
                //   open_id: data.openid,
                // });
                user = await ctx.model.User.create({ openId: data.openid });
                // ctx.logger.info('user:', user, data.openid);
            }
            await ctx.login(user.dataValues);
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
                            shareCode: nanoid_1.nanoid(),
                        });
                    }
                    i = i.get();
                    const d = i.birthday;
                    const today = new Date();
                    if (i.isLunar) {
                        i.solarBirthday = utils_1.lunarToSolar(today.getFullYear(), d.getMonth() + 1, d.getDate());
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
                errcode: 0,
                data,
            };
        }
        else {
            ctx.throw(401, '权限校验失败', { data: null });
        }
    }
}
module.exports = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQzdDLG1EQUFtRDtBQUNuRCxvQ0FBb0M7QUFDcEMsbUNBQWdDO0FBQ2hDLDhDQUE4QztBQUM5QyxvQ0FBd0M7QUFDeEMsTUFBTSxjQUFlLFNBQVEsVUFBVTtJQUNyQyxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxtQkFFeEIsR0FBRyxDQUFDLElBQUksR0FFYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUMxQjtnQkFDRSxTQUFTLEVBQUUsSUFBSTthQUNoQixDQUNGLENBQUM7WUFDRixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxTQUFTLEdBQUcsS0FBSztnQkFDdkIsT0FBTyxFQUFFLENBQUM7YUFDWCxDQUFDO1NBQ0g7YUFBTTtZQUNMLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsTUFBTTtnQkFDSixPQUFPLEVBQUUsUUFBUTtnQkFDakIsTUFBTSxFQUFFLEdBQUc7YUFDWixDQUFD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