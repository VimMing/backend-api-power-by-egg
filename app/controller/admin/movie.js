'use strict';

const Controller = require('egg').Controller;

class Movie extends Controller {
  async getTodayPic() {
    const ctx = this.ctx;
    await this.service.movie.getTodayPic();
    ctx.body = { errCode: 0 };
  }

}

module.exports = Movie;
