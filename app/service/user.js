'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async find(uid) {
    // assume we have the user id then trying to get the user details from database
    const user = await this.app.mysql.get('user', { id: uid });
    return { ...user };
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
  async addFriend({ name, birthday, isLunar }, user) {
    const mysql = this.app.mysql;
    const res = await mysql.insert('user', { name, birthday, is_lunar: isLunar });
    await mysql.insert('my_friend', { my_id: user.id, friend_id: res.insertId });
    return await this.app.mysql.get('user', { id: res.insertId });
  }
}

module.exports = UserService;
