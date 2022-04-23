/* eslint valid-jsdoc: "off" */


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql: {
      client: {
        host: '127.0.0.1',
        port: '63306',
        user: 'vimming',
        password: 'mysql123',
        database: 'test',
      },
    },
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 63306,
      database: 'test',
      password: 'mysql123',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602841184197_8076';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  exports.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };
  config.jwt = {
    secret: '1607334029003',
  };
  // only takes effect on URL prefix with '/api'
  config.errorHandler = {
    match: '/api',
  };

  config.cors = {
    origin: '*', // 注释掉，因为不支持cookie
    credentials: true, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.security = {
    csrf: {
      ignore: '/api',
      xframe: {
        // ...
      },
    },
  };

  config.rest = {
    urlprefix: '/api/', // Prefix of rest api url. Default to /api/
    authRequest: null,
    // authRequest: async ctx => {
    //   // A truthy value must be returned when authentication succeeds.
    //   // Otherwise the client will be responded with `401 Unauthorized`
    //   return accessToken;
    // }

    // Specify the APIs for which authentication can be ignored.
    // If authRequest is configured, authentication for all APIs is required by default.
    authIgnores: null,
    // authIgnores: {
    //   users: {
    //     show: true, // allow GET /api/users/:id to ignore authentication
    //     index: true,
    //   }
    // }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
