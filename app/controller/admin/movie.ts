import BaseController from '../base';
class MovieController extends BaseController {
  modelName = 'Movie';
  async getTodayPic() {
    const ctx = this.ctx;
    await this.service.movie.getTodayPic();
    ctx.body = { errCode: 0 };
  }
}

export default MovieController;
