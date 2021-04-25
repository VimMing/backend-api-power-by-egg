// eslint-disable-next-line strict
module.exports = () => {
  return async function jwt2auth(ctx, next) {
    if (ctx.state && ctx.state.user) {
      const user = ctx.state.user;
      await ctx.login(user.dataValues ? user.dataValues : user);
      await next();
    } else {
      throw ({
        message: 'token无效',
        status: 401,
      });
    }
  };
};
