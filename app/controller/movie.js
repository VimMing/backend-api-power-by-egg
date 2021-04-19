'use strict';
const Controller = require('egg').Controller;

class MovieController extends Controller {
  async getOne() {
    return { errCode: 0, data: await this.service.movie.getOne() };
  }
}

module.exports = MovieController;
