'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    mobile: STRING,
    password: STRING,
    openId: {
      type: STRING,
      field: 'open_id',
    },
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
    nickname: STRING,
    updatedAt: {
      type: DATE,
      field: 'updated_at',
    },
    avatarUrl: {
      type: STRING,
      field: 'avatar_url',
    },
    isAdmin: {
      type: BOOLEAN,
      field: 'is_admin',
    },
  }, {
    tableName: 'user',
  });

  return User;
};
