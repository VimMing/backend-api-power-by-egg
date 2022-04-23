
module.exports = {
  schedule: {
    cron: '0 0 0/1 * * *',
    type: 'all', // specify all `workers` need to execute
  },
  async task(ctx) {
    await ctx.service.wx.sendBirthdayNotice();
    ctx.logger.info('birthday_notice shedule');
  },
};

// error [HPE_INVALID_METHOD] occurred: Parse Error: Invalid method encountered
