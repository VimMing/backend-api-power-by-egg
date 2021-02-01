// eslint-disable-next-line strict
module.exports = () => {
  return async function jwt2auth(ctx, next) {
    ctx.logger.info('gzip middleware');
    await next();
  };
};
