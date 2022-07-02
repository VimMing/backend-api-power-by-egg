import { nanoid } from 'nanoid';
import { lunarToSolar } from '../utils';
import BaseController from './base';
class UserController extends BaseController {
  async createToken() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      const token = this.app.jwt.sign(
        {
          ...ctx.user,
        },
        this.app.config.jwt.secret,
        {
          expiresIn: '2h',
        }
      );
      ctx.body = {
        data: 'Bearer ' + token,
        errCode: 0,
      };
    } else {
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
      } else {
        ctx.throw({
          status: 400,
          message: '生日不存在，请确认',
        });
      }
    } else {
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
    } else {
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
      let friend: any = {};
      if (id) {
        friend = await ctx.model.MyFriend.findByPk(parseInt(id));
        if (friend && friend.userId === ctx.user.id) {
          await friend.update({ name, birthday, isLunar, zodiac });
        } else {
          ctx.body = {
            errCode: 1,
            errMsg: 'id有误',
          };
        }
      } else {
        friend = await ctx.model.MyFriend.create({
          name,
          birthday,
          isLunar,
          zodiac,
          userId: ctx.user.id,
        });
      }

      ctx.body = friend;
    } else {
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
    const friend = await (ctx.model as Egg.IModel).MyFriend.findOne({
      where: {
        shareCode: ctx.query.shareCode,
      },
    });
    let i: any = null;
    if (friend) {
      i = friend.get();
      const d = i.birthday;
      const today = new Date();
      if (i.isLunar) {
        i.solarBirthday = lunarToSolar(
          today.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        );
        // ctx.logger.info(typeof i.birthday.getFullYear());
      } else {
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
          shareCode: nanoid(),
        });
        ctx.body = {
          data: res,
          errCode: 0,
        };
      } else {
        ctx.body = {
          errCode: 1,
          errMsg: '她/他已经是你的朋友了',
        };
      }
    } else {
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
    const result = await ctx.curl(
      `${url}?appid=${key}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    );
    ctx.status = result.status;
    const data = JSON.parse(Buffer.from(result.data).toString());
    if (data.errCode) {
      ctx.body = data;
    } else {
      let user = await ctx.model.User.findOne({
        where: {
          openId: data.openid,
        },
      });
      if (!user) {
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
      let data = [] as typeof friends;
      // ctx.logger.info('user: hello world', friends);
      if (friends) {
        // ctx.logger.info(friends);
        data = friends.map((i: any) => {
          if (!i.shareCode) {
            i.update({
              shareCode: nanoid(),
            });
          }
          i = i.get();
          const d = i.birthday;
          const today = new Date();
          if (i.isLunar) {
            i.solarBirthday = lunarToSolar(
              today.getFullYear(),
              d.getMonth() + 1,
              d.getDate()
            );
          } else {
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
    } else {
      ctx.throw(401, '权限校验失败', { data: null });
    }
  }
}

module.exports = UserController;
