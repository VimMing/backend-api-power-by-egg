const fs = require('fs');
const path = require('path');
const canvasTextLine = require('./util/canvasTextLineFeed');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fileTools = require('./util/fileTools');
const week_day_dict = {
    1 : '星期一',
    2 : '星期二',
    3 : '星期三',
    4 : '星期四',
    5 : '星期五',
    6 : '星期六',
    0 : '星期天',
}

const filePath = './data/json/DoubanMovieBak/04/movie-2021-04-08.json';

// registerFont('./font/NotoSansHans-Bold.otf', { family: 'NotoSansHans-Bold', weight: 'bold' })
/**
 * sleep current task 
 * @param {*} ms 
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};

function readJsonFiles(filePath) {

    let state = fs.statSync(filePath);
    if (state.isFile()) {
        fs.readFile(filePath, "utf-8", function (err, data) {
            let json = JSON.parse(data);
            console.log(json)
            nodeCanvasToImage(json);
        });
        // let jsonStr = fs.readFileSync(filePath, 'utf-8');
        // nodeCanvasToImage(JSON.parse(jsonStr));
    } else if (state.isDirectory()) {
        let files = fs.readdirSync(filePath);
        files.forEach(async (file, index) => {
            // await wait(2000 * index);
            // console.log(filePath, file);
            // testReadFiles(path.join(filePath, file));
        });
    }
}

readJsonFiles(filePath);

function nodeCanvasToImage(json) {

    const picInfo = {};
    picInfo.content = json.comment.content;
    picInfo.poster = json.comment.poster;
    picInfo.title = json.subject.title;
    picInfo.card_subtitle = json.subject.card_subtitle;
    picInfo.today = picInfo.today || {};
    picInfo.today.date = json.today.date;
    picInfo.today.title = json.today.title;
    picInfo.score = json.subject.rating.value;
    //console.log(picInfo);

    const canvasWidth = 818;
    const canvasHeight = 1200;
    const paddingLeft = 60;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = 'rgba(250, 250, 250, 1)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Load image then create canvas, draw text and output png file.
    loadImage(picInfo.poster).then((image) => {

        const textLeftPx = canvasWidth / 2;
        // year address genres
        const subArr = json.subject.card_subtitle.replace('\n', '/').split('/')
        const today = new Date(json.today.date)
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillStyle = '#' + json.comment.color_scheme.primary_color_dark;
        ctx.font = 'bold 30px "sans-serif"';
        ctx.textAlign = 'left';
        ctx.fillText(`《${json.subject.title}》(${json.subject.year})`, paddingLeft, 80);
        ctx.font = '20px Microsoft Yahei';
        ctx.fillText(`豆瓣评分 ${picInfo.score.toFixed(1)}`, paddingLeft + 20, 120);
        ctx.fillText(`${subArr[1].trim()} ${json.subject.genres.join("/")}`, paddingLeft + 20, 150);
        ctx.fillText(`${subArr[subArr.length - 1].trim()}`, paddingLeft + 20, 180);
        ctx.font = '400 120px "sans-serif"';
        ctx.textAlign = 'right';
        ctx.fillText(`${('0' + today.getDate()).slice(-2)}`, canvasWidth - paddingLeft * 2.5, 160);
        ctx.font = '20px Microsoft Yahei';
        ctx.fillText(`${('0' + (today.getMonth() + 1)).slice(-2)}月${('0' + today.getDate()).slice(-2)}日`, canvasWidth - paddingLeft * 1, 110);
        ctx.fillText(`${week_day_dict[today.getDay()]}`, canvasWidth - paddingLeft * 1, 140);

        ctx.drawImage(image, 0, 220, canvasWidth, 459);

        // ctx.font = '30px Microsoft Yahei';
        // ctx.fillText("《" + picInfo.title + "》", textLeftPx, 730);

        const contentHeight = 800;
        const lineHeight = 40;
        const linePadding = 60;
        //ctx.fillText(picInfo.content + picInfo.content, 611, 740, 1022);
        ctx.fillStyle = '#' + json.comment.color_scheme.primary_color_dark;
        ctx.font = '20px Microsoft Yahei';
        ctx.textAlign = 'left';
        const resultLines = canvasTextLine.breakLinesForCanvas(ctx, '"' + picInfo.content + '"', canvasWidth - 100, '24px Microsoft Yahei');
        resultLines.forEach(function (line, index) {
            ctx.fillText(line, paddingLeft, contentHeight + lineHeight * index);
        });
        const stream = canvas.createPNGStream();
        let month = picInfo.today.date.split('-')[1];
        const folderPath = './data/images/DoubanMoviePic/' + month;
        const dirExistStatus = fileTools.dirExists(folderPath);
        dirExistStatus.then(() => {
            const out = fs.createWriteStream(folderPath + '/' + picInfo.today.date + '.png');
            stream.pipe(out);
            out.on('finish', () => console.log('The PNG file was created.'));
            out.on('error', (err) => console.log('create write stream error!', err));
        });

    }).catch(err => {
        console.log('load image error!', err);
    });

}

