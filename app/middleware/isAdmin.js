// eslint-disable-next-line strict
module.exports = () => {
  return async function jwt2auth(ctx, next) {
    if (ctx.isAuthenticated() && ctx.user && ctx.user.isAdmin) {
      await next();
    } else {
      throw ({
        message: '无权限',
        status: 401,
      });
    }
  };
};
