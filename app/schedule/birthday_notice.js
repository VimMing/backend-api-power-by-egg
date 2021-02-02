'use strict';
module.exports = {
  schedule: {
    cron: '0 40 10 * * *',
    type: 'all', // specify all `workers` need to execute
  },
  async task(ctx) {
    // const res = await ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    // ctx.app.cache = res.data;
    ctx.logger.info('date:', new Date().getMinutes());
  },
};
