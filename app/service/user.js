'use strict';
const crypto = require('crypto');
const Service = require('egg').Service;
class UserService extends Service {
  async find(query) {
    const user = await this.app.mysql.get('user', query);
    return user;
  }
  async getMyFriends(uid) {
    const mysql = this.app.mysql;
    const user = await mysql.get('user', { id: uid });
    let res = [];
    if (user) {
      const friends = await mysql.query('select * from my_friend as m join user as u on m.friend_id = u.id where m.my_id = ?;', [ mysql.escape(uid) ]);
      res = friends || [];
    }
    return res;
  }
  async register({ open_id } = {}) {
    const mysql = this.app.mysql;
    const res = await mysql.insert('user', { open_id });
    return await this.app.mysql.get('user', { id: res.insertId });
  }
  async addFriend({ name, birthday, isLunar }, user) {
    const mysql = this.app.mysql;
    const res = await mysql.insert('user', { name, birthday, is_lunar: isLunar });
    await mysql.insert('my_friend', { my_id: user.id, friend_id: res.insertId });
    return await this.app.mysql.get('user', { id: res.insertId });
  }
  async validatorUser(user) {
    const { ctx } = this;
    const u = await ctx.model.User.findOne({ where: { mobile: user.username } });
    if (u) {
      const pwd = await crypto.createHash('md5').update(user.password + '').digest('hex');
      // ctx.logger.info('verify %s %s', u.password, pwd);
      return u.password === pwd ? u : false;
    }
    throw ({
      message: '手机号不存在',
    });

  }
}

module.exports = UserService;
