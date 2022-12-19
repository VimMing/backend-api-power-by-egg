const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class MovieController extends Controller {
  async getOne() {
    return { errCode: 0, data: await this.service.movie.getOne() };
  }
  async getMiniMyModuleBgImage() {
    const { ctx } = this;
    const result = await ctx.curl(`https://api.ixiaowai.cn/gqapi/gqapi.php`, {
      timeout: 5000,
      followRedirect: true,
      maxRedirects: 5,
    });
    const out = fs.createWriteStream(
      path.resolve('./app/public/douban', 'my-bg.png')
    );

    out.write(result.data);
    out.on('finish', () => console.log('The PNG file was created.'));
    out.on('error', (err) => console.log('create write stream error!', err));
    ctx.body = 'hi, success';
  }
}

module.exports = MovieController;
