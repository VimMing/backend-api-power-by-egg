'use strict';
module.exports = {
  schedule: {
    cron: '0 0 0 * * *',
    type: 'all', // specify all `workers` need to execute
  },
  async task(ctx) {
    await ctx.service.movie.getTodayPic();
    ctx.logger.info('getTodayPic shedule');
  },
};

// error [HPE_INVALID_METHOD] occurred: Parse Error: Invalid method encountered
