/* eslint-disable @typescript-eslint/no-var-requires */

function findBreakPoint(text, width, context) {
  let min = 0;
  let max = text.length - 1;

  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    const middleWidth = context.measureText(text.substr(0, middle)).width;
    const oneCharWiderThanMiddleWidth = context.measureText(
      text.substr(0, middle + 1)
    ).width;
    if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
      return middle;
    }
    if (middleWidth < width) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
}

function breakLinesForCanvas(context, text, width, font) {
  const result = [];
  let breakPoint = 0;

  if (font) {
    context.font = font;
  }

  while ((breakPoint = findBreakPoint(text, width, context)) !== -1) {
    result.push(text.substr(0, breakPoint));
    text = text.substr(breakPoint);
  }

  if (text) {
    result.push(text);
  }

  return result;
}
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const Service = require('egg').Service;
class UserService extends Service {
  async getOne() {
    const { ctx } = this;
    const res = await ctx.model.Movie.findOne({
      where: {
        uid: Math.ceil(Math.random() * 350) + '',
      },
    });
    return res;
  }
  async getTodayPic() {
    // const ctx = this.ctx;
    // const { list, amount } = await this.service.user.list(ctx.request.body);
    // ctx.body = { data: list, errCode: 0, total: amount };
    const data = await this.service.movie.getOne();
    const canvasWidth = 818;
    const canvasHeight = 1200;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
    const paddingLeft = 60;
    const week_day_dict = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期天',
    };
    // Fill background
    ctx.fillStyle = 'rgba(250, 250, 250, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await loadImage(data.comment.poster).then((img) => {
      const subArr = data.cardSubtitle.replace('\n', '/').split('/');
      const today = new Date();
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillStyle = '#' + data.comment.color_scheme.primary_color_dark;
      ctx.font = 'bold 30px "sans-serif" " Microsoft Yahei"';
      ctx.textAlign = 'left';
      ctx.fillText(`《${data.title}》(${data.year})`, paddingLeft, 80);
      ctx.font = '20px Microsoft Yahei';
      ctx.fillText(
        `豆瓣评分 ${data.rating.value.toFixed(1)}`,
        paddingLeft + 20,
        120
      );
      ctx.fillText(
        `${subArr[1].trim()} ${data.genres.join('/')}`,
        paddingLeft + 20,
        150
      );
      ctx.fillText(
        `${subArr[subArr.length - 1].trim()}`,
        paddingLeft + 20,
        180
      );
      ctx.font = '400 120px "sans-serif" " Microsoft Yahei"';
      ctx.textAlign = 'right';
      ctx.fillText(
        `${('0' + today.getDate()).slice(-2)}`,
        canvasWidth - paddingLeft * 2.5,
        160
      );
      ctx.font = '20px Microsoft Yahei';
      ctx.fillText(
        `${('0' + (today.getMonth() + 1)).slice(-2)}月${(
          '0' + today.getDate()
        ).slice(-2)}日`,
        canvasWidth - paddingLeft * 1,
        110
      );
      ctx.fillText(
        `${week_day_dict[today.getDay()]}`,
        canvasWidth - paddingLeft * 1,
        140
      );

      ctx.drawImage(img, 0, 220, canvasWidth, 459);

      const contentHeight = 800;
      const lineHeight = 40;
      ctx.fillStyle = '#' + data.comment.color_scheme.primary_color_dark;
      ctx.font = '20px Microsoft Yahei';
      ctx.textAlign = 'left';
      const resultLines = breakLinesForCanvas(
        ctx,
        '"' + data.comment.content + '"',
        canvasWidth - 100,
        '24px Microsoft Yahei'
      );
      resultLines.forEach(function (line, index) {
        ctx.fillText(line, paddingLeft, contentHeight + lineHeight * index);
      });
      ctx.textAlign = 'right';
      ctx.fillText(
        '-豆瓣用户',
        canvasWidth - paddingLeft,
        contentHeight + lineHeight * (resultLines.length + 1)
      );
      const stream = canvas.createPNGStream();
      const out = fs.createWriteStream(
        path.resolve('./app/public/douban', 'today.png')
      );
      stream.pipe(out);
      out.on('finish', () => console.log('The PNG file was created.'));
      out.on('error', (err) => console.log('create write stream error!', err));
    });
    this.ctx.body = { errCode: 0 };
  }
}
module.exports = UserService;
