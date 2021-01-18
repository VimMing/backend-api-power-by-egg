'use strict';

const Controller = require('egg').Controller;
const LunarCalendar = require('lunar-calendar');
function lunarToSolar(y, m, d) {
  //
  const map = { 2020: 4, 2023: 2, 2025: 6, 2028: 5, 2031: 3, 2033: 11, 2036: 6, 2039: 5, 2042: 2 };
  // eslint-disable-next-line prefer-const
  let ly = y - 1,
    lm = m;
  if (map[ly] && map[ly] < lm) {
    lm = lm + 1;
  }
  if (map[y] && map[y] < m) {
    m = m + 1;
  }
  const l_s = LunarCalendar.lunarToSolar(ly, lm, d);
  if (parseInt(l_s.year) === parseInt(y)) {
    return l_s;
  }

  return LunarCalendar.lunarToSolar(y, m, d);
}
class UserController extends Controller {
  async createToken() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      const token = this.app.jwt.sign({
        ...ctx.user,
      }, this.app.config.jwt.secret, {
        expiresIn: '2h',
      });
      ctx.body = {
        data: 'Bearer ' + token,
        errcode: 0,
      };
    } else {
      ctx.throw(401, '没通过权限校验', { data: null });
    }
  }

  async create() {
    // 新增用户
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.validate({ name: 'string', birthday: 'date', isLunar: 'boolean', zodiac: 'int' });
      const { id, name, birthday, isLunar, zodiac } = ctx.request.body;
      let friend = {};
      if (id) {
        // friend = await ctx.model.MyFriend.create({ });
        friend = await ctx.model.MyFriend.findByPk(parseInt(id));
        if (friend && friend.userId === ctx.user.id) {
          await friend.update({ name, birthday, isLunar, zodiac });
        } else {
          ctx.body = {
            errcode: 1,
            errMessage: 'id有误',
          };
        }
      } else {
        ctx.logger.info('user:', ctx.user);
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

  async update() {
    console.log('hello world');
    // 验证是否是他的朋友
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(2);
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
    } else {
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
        user = (await ctx.model.User.create({ openId: data.openid }));
        ctx.logger.info('user:', user, data.openid);
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
        ctx.logger.info(friends);
        data = friends.map(i => {
          i = i.get();
          const d = i.birthday;
          if (i.isLunar) {
            const today = new Date();
            i.solarBirthday = lunarToSolar(today.getFullYear(), d.getMonth() + 1, d.getDate());
            ctx.logger.info(typeof i.birthday.getFullYear());
          } else {
            i.solarBirthday = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
          }
          return i;
        });
      }
      ctx.body = {
        errcode: 0,
        data,
      };
    } else {
      ctx.throw(401, '权限校验失败', { data: null });
    }
  }
}

module.exports = UserController;
