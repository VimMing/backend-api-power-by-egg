'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, JSON, DATE, STRING } = Sequelize;
    await queryInterface.createTable('wx_subscription', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: INTEGER, references: {
          model: {
            tableName: 'user',

          },
          key: 'id',
        },
        allowNull: false,
      },
      name: STRING,
      when: DATE,
      content: JSON,
      status: { type: INTEGER, defaultValue: 0 }, // 0 , 1 success, 2 fail
      template_id: STRING,
      err_message: STRING,
      created_at: DATE,
      updated_at: DATE,
    }, {
      indexes: [{ fields: [ 'user_id' ] }],
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('wx_subscription');
  },
};
