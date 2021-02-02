'use strict';
module.exports = {
  schedule: {
    cron: '0 0 17 * * *',
    type: 'all', // specify all `workers` need to execute
  },
  async task(ctx) {
    await ctx.service.wx.sendBirthdayNotice();
    ctx.logger.info('birthday_notice shedule');
  },
};
