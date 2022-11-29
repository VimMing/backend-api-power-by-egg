"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const Service = require('egg').Service;
const utils_1 = require("../utils");
class UserService extends Service {
    async find(query) {
        const user = await this.app.mysql.get('user', query);
        return user;
    }
    async list({ page = 1, limit = 20, __searchForm = [] } = {}) {
        const { ctx } = this;
        const list = await ctx.model.User.findAll({
            where: (0, utils_1.getWhereClauses)(__searchForm),
            limit,
            offset: (page - 1) * limit,
        });
        const amount = await ctx.model.User.count({
            where: (0, utils_1.getWhereClauses)(__searchForm),
        });
        return { list, amount, page };
    }
    async getMyFriends(uid) {
        const mysql = this.app.mysql;
        const user = await mysql.get('user', { id: uid });
        let res = [];
        if (user) {
            const friends = await mysql.query('select * from my_friend as m join user as u on m.friend_id = u.id where m.my_id = ?;', [mysql.escape(uid)]);
            res = friends || [];
        }
        return res;
    }
    async register({ open_id = '' } = {}) {
        const mysql = this.app.mysql;
        const res = await mysql.insert('user', { open_id });
        return await this.app.mysql.get('user', { id: res.insertId });
    }
    async addFriend({ name, birthday, isLunar }, user) {
        const mysql = this.app.mysql;
        const res = await mysql.insert('user', {
            name,
            birthday,
            is_lunar: isLunar,
        });
        await mysql.insert('my_friend', {
            my_id: user.id,
            friend_id: res.insertId,
        });
        return await this.app.mysql.get('user', { id: res.insertId });
    }
    async validatorUser(user) {
        const { ctx } = this;
        const u = await ctx.model.User.findOne({
            where: { mobile: user.username },
        });
        if (u) {
            const pwd = await crypto
                .createHash('md5')
                .update(user.password + '')
                .digest('hex');
            // ctx.logger.info('verify %s %s', u.password, pwd);
            return u.password === pwd ? u : false;
        }
        throw {
            message: '手机号不存在',
        };
    }
}
module.exports = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2QyxvQ0FBMkM7QUFDM0MsTUFBTSxXQUFZLFNBQVEsT0FBTztJQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxZQUFZLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUN6RCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hDLEtBQUssRUFBRSxJQUFBLHVCQUFlLEVBQUMsWUFBWSxDQUFDO1lBQ3BDLEtBQUs7WUFDTCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSztTQUMzQixDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN4QyxLQUFLLEVBQUUsSUFBQSx1QkFBZSxFQUFDLFlBQVksQ0FBQztTQUNyQyxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ0Qs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