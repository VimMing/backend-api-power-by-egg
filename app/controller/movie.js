'use strict';
const Controller = require('egg').Controller;

class MovieController extends Controller {
  async getOne() {
    const { ctx } = this;
    const res = await ctx.model.Movie.findOne({
      where: {
        uid: Math.ceil(Math.random() * 350) + '',
      },
    });
    ctx.body = { errCode: 0, data: res };
  }
}

module.exports = MovieController;
