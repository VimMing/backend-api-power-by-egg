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
    async getSelfInfo() {
        const { ctx } = this;
        ctx.body = {
            data: ctx.user,
            errCode: 0,
        };
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
    async createByInvitation() {
        const { ctx } = this;
        ctx.validate({
            name: 'string',
            birthday: 'date',
            isLunar: 'boolean',
            zodiac: 'int',
            userId: 'int',
        });
        const { userId, name, birthday, isLunar, zodiac } = ctx.request.body;
        const isExist = await ctx.model.MyFriend.findOne({
            where: {
                userId,
                friendId: ctx.user.id,
            },
        });
        if (isExist === null) {
            const friend = await ctx.model.MyFriend.create({
                name,
                birthday,
                isLunar,
                zodiac,
                friendId: ctx.user.id,
                userId,
            });
            ctx.body = {
                data: friend,
                errCode: 0,
            };
        }
        else {
            ctx.body = {
                data: isExist.get(),
                errCode: 1,
                errMsg: '已经添加了',
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFDaEMsb0NBQXdDO0FBQ3hDLGlDQUFvQztBQUNwQyxNQUFNLGNBQWUsU0FBUSxjQUFjO0lBQTNDOztRQUNFLGNBQVMsR0FBRyxNQUFNLENBQUM7SUF3VnJCLENBQUM7SUF2VkMsS0FBSyxDQUFDLFdBQVc7UUFDZixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksbUJBRXhCLEdBQUcsQ0FBQyxJQUFJLEdBRWIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDMUI7Z0JBQ0UsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FDRixDQUFDO1lBQ0YsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDVCxJQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUs7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNIO2FBQU07WUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLE1BQU07Z0JBQ0osT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztTQUNIO1FBQ0QsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQzlDLEtBQUssRUFBRTtvQkFDTCxFQUFFO29CQUNGLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7aUJBQ3BCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLENBQUM7aUJBQ1gsQ0FBQztnQkFDRixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUNSLE1BQU0sRUFBRSxHQUFHO29CQUNYLE9BQU8sRUFBRSxXQUFXO2lCQUNyQixDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNSLE1BQU0sRUFBRSxHQUFHO2dCQUNYLE9BQU8sRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELHVCQUF1QjtJQUN2QixLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNqRCxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFNBQVM7YUFDVixDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNIO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULE9BQU8sRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQUNELEtBQUssQ0FBQyxNQUFNO1FBQ1YsT0FBTztRQUNQLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNqRSxJQUFJLE1BQU0sR0FBUSxFQUFFLENBQUM7WUFDckIsSUFBSSxFQUFFLEVBQUU7Z0JBQ04sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUMzQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUMxRDtxQkFBTTtvQkFDTCxHQUFHLENBQUMsSUFBSSxHQUFHO3dCQUNULE9BQU8sRUFBRSxDQUFDO3dCQUNWLE1BQU0sRUFBRSxNQUFNO3FCQUNmLENBQUM7aUJBQ0g7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQ3ZDLElBQUk7b0JBQ0osUUFBUTtvQkFDUixPQUFPO29CQUNQLE1BQU07b0JBQ04sTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtpQkFDcEIsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNuQjthQUFNO1lBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQy9DLEtBQUssRUFBRTtnQkFDTCxNQUFNO2dCQUNOLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzdDLElBQUk7Z0JBQ0osUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckIsTUFBTTthQUNQLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLENBQUM7YUFDWCxDQUFDO1NBQ0g7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU0sRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWTtRQUNoQixNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNCLFlBQVk7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLG9CQUFvQjtRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLE1BQU8sR0FBRyxDQUFDLEtBQW9CLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUM5RCxLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUzthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFRLElBQUksQ0FBQztRQUNsQixJQUFJLE1BQU0sRUFBRTtZQUNWLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDYixDQUFDLENBQUMsYUFBYSxHQUFHLElBQUEsb0JBQVksRUFDNUIsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUNuQixDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUNoQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQ1osQ0FBQztnQkFDRixvREFBb0Q7YUFDckQ7aUJBQU07Z0JBQ0wsQ0FBQyxDQUFDLGFBQWEsR0FBRztvQkFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUU7b0JBQ3pCLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztvQkFDdkIsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7aUJBQ2pCLENBQUM7YUFDSDtTQUNGO1FBQ0QsR0FBRyxDQUFDLElBQUksR0FBRztZQUNULElBQUksRUFBRSxDQUFDLElBQUksTUFBTTtZQUNqQixPQUFPLEVBQUUsQ0FBQztTQUNYLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLDZCQUE2QjtRQUNqQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFDRCxLQUFLLENBQUMsd0JBQXdCO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU0sRUFBRSxRQUFRO2FBQ2pCLENBQUM7WUFDRixNQUFNO2dCQUNKLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixNQUFNLEVBQUUsR0FBRzthQUNaLENBQUM7U0FDSDtRQUNELElBQUksR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLE1BQU07b0JBQ0osT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE1BQU0sRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDSDtZQUNELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqQyxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDN0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQzFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQkFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO29CQUN6QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87b0JBQ3ZCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtvQkFDckIsU0FBUyxFQUFFLElBQUEsZUFBTSxHQUFFO2lCQUNwQixDQUFDLENBQUM7Z0JBQ0gsR0FBRyxDQUFDLElBQUksR0FBRztvQkFDVCxJQUFJLEVBQUUsR0FBRztvQkFDVCxPQUFPLEVBQUUsQ0FBQztpQkFDWCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLElBQUksR0FBRztvQkFDVCxPQUFPLEVBQUUsQ0FBQztvQkFDVixNQUFNLEVBQUUsYUFBYTtpQkFDdEIsQ0FBQzthQUNIO1NBQ0Y7YUFBTTtZQUNMLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsTUFBTSxFQUFFLFFBQVE7YUFDakIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0I7UUFDcEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNqRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QixNQUFNLEdBQUcsR0FBRyw4Q0FBOEMsQ0FBQztRQUMzRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQzNCLEdBQUcsR0FBRyxVQUFVLEdBQUcsV0FBVyxNQUFNLFlBQVksSUFBSSxnQ0FBZ0MsQ0FDckYsQ0FBQztRQUNGLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDdEMsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtpQkFDcEI7YUFDRixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsK0NBQStDO2FBQ2hEO1lBQ0QsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUNELEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxLQUFLLENBQUMsU0FBUztRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQy9DLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2lCQUNwQjthQUNGLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxHQUFHLEVBQW9CLENBQUM7WUFDaEMsaURBQWlEO1lBQ2pELElBQUksT0FBTyxFQUFFO2dCQUNYLDRCQUE0QjtnQkFDNUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7d0JBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUM7NEJBQ1AsU0FBUyxFQUFFLElBQUEsZUFBTSxHQUFFO3lCQUNwQixDQUFDLENBQUM7cUJBQ0o7b0JBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN6QixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7d0JBQ2IsQ0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFBLG9CQUFZLEVBQzVCLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFDbkIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFDaEIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUNaLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsQ0FBQyxDQUFDLGFBQWEsR0FBRzs0QkFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUU7NEJBQ3pCLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQzs0QkFDdkIsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7eUJBQ2pCLENBQUM7cUJBQ0g7b0JBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsSUFBSTthQUNMLENBQUM7U0FDSDthQUFNO1lBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyJ9